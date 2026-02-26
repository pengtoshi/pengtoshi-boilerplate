import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { firstValueFrom } from "rxjs";
import { ErrorMessage } from "@libs/constants";
import { AuthProvider, Role, Status } from "@libs/model";
import type {
  AuthToken,
  AuthTokenInput,
  JwtPayload,
  KakaoTokenResponse,
  KakaoUserInfoResponse,
  UserSignInInput,
  UserSignInWithKakaoCodeInput,
} from "@libs/model";
import { PrismaService } from "@libs/nestjs-core";
import { AuthService } from "./auth/auth.service";
import type { KakaoConfig } from "../../common/config/config.interface";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private async fetchKakaoUserInfo(accessToken: string) {
    const kakaoConfig = this.configService.get<KakaoConfig>("kakao");
    if (!kakaoConfig?.userInfoUrl) {
      throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_CONFIG);
    }

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<KakaoUserInfoResponse>(kakaoConfig.userInfoUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      const kakaoId = String(data?.id ?? "");
      // NOTE: email is optional. It can be undefined when account_email scope is not requested.
      const email = data?.kakao_account?.email ? this.normalizeEmail(data.kakao_account.email) : undefined;
      if (!kakaoId) throw new GraphQLError(ErrorMessage.MSG_INVALID_USER_INPUT);

      return { kakaoId, email };
    } catch {
      throw new GraphQLError(ErrorMessage.MSG_UNAUTHORIZED);
    }
  }

  private async fetchKakaoAccessTokenByCode({
    authorizationCode,
    redirectUri,
    codeVerifier,
  }: UserSignInWithKakaoCodeInput) {
    const kakaoConfig = this.configService.get<KakaoConfig>("kakao");
    if (
      !kakaoConfig?.tokenUrl ||
      !kakaoConfig?.restApiKey ||
      !kakaoConfig?.clientSecret ||
      !kakaoConfig?.mobileCallbackUrl
    ) {
      throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_CONFIG);
    }
    if (redirectUri !== kakaoConfig.mobileCallbackUrl) {
      throw new GraphQLError(ErrorMessage.MSG_INVALID_USER_INPUT);
    }
    if (!codeVerifier) {
      throw new GraphQLError(ErrorMessage.MSG_INVALID_USER_INPUT);
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: kakaoConfig.restApiKey,
      client_secret: kakaoConfig.clientSecret,
      code: authorizationCode,
      redirect_uri: redirectUri,
    });

    body.set("code_verifier", codeVerifier);

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<KakaoTokenResponse>(kakaoConfig.tokenUrl, body.toString(), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }),
      );

      const accessToken = data?.access_token;
      if (!accessToken) throw new GraphQLError(ErrorMessage.MSG_UNAUTHORIZED);
      return accessToken;
    } catch {
      throw new GraphQLError(ErrorMessage.MSG_UNAUTHORIZED);
    }
  }

  private async persistAuthTokens(userId: string, token: AuthToken) {
    const encryptedRefreshToken = await bcrypt.hash(token.refreshToken, 10);

    await this.prisma.authToken.upsert({
      create: {
        userId,
        accessToken: token.accessToken,
        refreshToken: encryptedRefreshToken,
      },
      update: {
        accessToken: token.accessToken,
        refreshToken: encryptedRefreshToken,
      },
      where: { userId },
    });
  }

  private async signInWithKakao({ kakaoAccessToken }: UserSignInInput) {
    const { kakaoId, email } = await this.fetchKakaoUserInfo(kakaoAccessToken);
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ kakaoId }, ...(email ? [{ email }] : [])],
      },
    });

    if (user) {
      if (user.kakaoId !== kakaoId || user.authProvider !== AuthProvider.KAKAO) {
        return this.prisma.user.update({
          where: { id: user.id },
          data: {
            kakaoId,
            authProvider: AuthProvider.KAKAO,
          },
        });
      }
      return user;
    }

    return this.prisma.user.create({
      data: {
        email,
        kakaoId,
        authProvider: AuthProvider.KAKAO,
        role: Role.USER,
        status: Status.ACTIVE,
      },
    });
  }

  async userSignIn(input: UserSignInInput) {
    const user = await this.signInWithKakao(input);
    const authToken = this.authService.generateTokens({ userId: user.id });
    await this.persistAuthTokens(user.id, authToken);
    return authToken;
  }

  async userSignInWithKakaoCode(input: UserSignInWithKakaoCodeInput) {
    const kakaoAccessToken = await this.fetchKakaoAccessTokenByCode(input);
    return this.userSignIn({ kakaoAccessToken });
  }

  async refreshTokens({ refreshToken }: AuthTokenInput) {
    if (!refreshToken) throw new GraphQLError(ErrorMessage.MSG_INVALID_TOKEN);

    const { userId } = this.authService.verifyRefreshToken(refreshToken);
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_USER);

    const authToken = await this.prisma.authToken.findUnique({
      where: { userId: user.id },
    });
    if (!authToken) throw new GraphQLError(ErrorMessage.MSG_NOT_FOUND_AUTH_TOKEN);

    const isValidToken = await bcrypt.compare(refreshToken, authToken.refreshToken);
    if (!isValidToken) {
      // 이미 교체된 토큰으로 재시도 = 탈취 의심 → 해당 유저의 모든 세션 즉시 무효화
      await this.prisma.authToken.deleteMany({ where: { userId: user.id } });
      throw new GraphQLError(ErrorMessage.MSG_UNAUTHORIZED);
    }

    const newAuthToken = this.authService.generateTokens({ userId: user.id });
    await this.persistAuthTokens(user.id, newAuthToken);
    return newAuthToken;
  }

  async signOut(payload: JwtPayload) {
    await this.prisma.authToken.deleteMany({
      where: {
        userId: payload.userId,
      },
    });
    return true;
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findUserById(id?: string) {
    if (!id) throw new GraphQLError(ErrorMessage.MSG_UNAUTHORIZED);

    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
