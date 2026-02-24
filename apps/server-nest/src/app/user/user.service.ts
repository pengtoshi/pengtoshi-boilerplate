import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { firstValueFrom } from "rxjs";
import { ErrorMessage } from "@libs/constants";
import { AuthProvider, Role } from "@libs/model";
import type { AuthToken, AuthTokenInput, KakaoUserInfoResponse, UserInput, VerifyUserInput } from "@libs/model";
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
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<KakaoUserInfoResponse>(`${this.configService.get<KakaoConfig>("kakao")!.userInfoUrl}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      const kakaoId = String(data?.id ?? "");
      const email = data?.kakao_account?.email ? this.normalizeEmail(data.kakao_account.email) : undefined;
      if (!kakaoId) throw new GraphQLError(ErrorMessage.MSG_INVALID_USER_INPUT);

      return { kakaoId, email };
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

  private async resolveKakaoUserForRequest({ kakaoAccessToken }: UserInput) {
    const { kakaoId, email } = await this.fetchKakaoUserInfo(kakaoAccessToken);
    const userByKakaoId = await this.prisma.user.findFirst({
      where: {
        kakaoId,
      },
    });

    if (userByKakaoId) {
      return this.prisma.user.update({
        where: { id: userByKakaoId.id },
        data: {
          email: email ?? userByKakaoId.email,
          authProvider: AuthProvider.KAKAO,
        },
      });
    }

    if (email) {
      const userByEmail = await this.prisma.user.findUnique({ where: { email } });
      if (userByEmail) {
        return this.prisma.user.update({
          where: { id: userByEmail.id },
          data: {
            kakaoId,
            authProvider: AuthProvider.KAKAO,
          },
        });
      }
    }

    return this.prisma.user.create({
      data: {
        email,
        kakaoId,
        authProvider: AuthProvider.KAKAO,
        role: Role.USER,
        status: "ACTIVE",
      },
    });
  }

  async requestLogin(userInput: UserInput) {
    return this.resolveKakaoUserForRequest(userInput);
  }

  private async verifyKakaoLogin({ kakaoAccessToken }: VerifyUserInput) {
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
        status: "ACTIVE",
      },
    });
  }

  async verifyLogin(input: VerifyUserInput) {
    const user = await this.verifyKakaoLogin(input);
    const authToken = this.authService.generateTokens({ userId: user.id });
    await this.persistAuthTokens(user.id, authToken);
    return authToken;
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
    if (!isValidToken) throw new GraphQLError(ErrorMessage.MSG_UNAUTHORIZED);

    const newAuthToken = this.authService.generateTokens({ userId: user.id });
    await this.persistAuthTokens(user.id, newAuthToken);
    return newAuthToken;
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
