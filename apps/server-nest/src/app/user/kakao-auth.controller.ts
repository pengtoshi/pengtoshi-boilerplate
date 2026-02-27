import { Controller, Get, Query, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { OAuthCallbackService } from "./oauth-callback.service";
import type { KakaoConfig } from "../../common/config/config.interface";

@Controller("auth/kakao")
export class KakaoAuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly oAuthCallbackService: OAuthCallbackService,
  ) {}

  @Get("callback")
  callback(
    @Query("code") code: string | undefined,
    @Query("state") state: string | undefined,
    @Query("error") error: string | undefined,
    @Query("error_description") errorDescription: string | undefined,
    @Res() res: Response,
  ) {
    const kakaoConfig = this.configService.get<KakaoConfig>("kakao");
    const appRedirectUri = kakaoConfig?.mobileAppRedirectUri;
    if (!appRedirectUri) {
      return res.status(500).send("KAKAO_MOBILE_APP_REDIRECT_URI is not configured.");
    }

    return this.oAuthCallbackService.relayToApp(appRedirectUri, { code, state, error, errorDescription }, res);
  }
}
