import type { ConfigType as CommonConfigType } from "@libs/nestjs-core";

export interface ConfigType extends CommonConfigType {
  kakao: KakaoConfig;
}

export interface KakaoConfig {
  restApiKey: string;
  clientSecret: string;
  tokenUrl: string;
  userInfoUrl: string;
  mobileCallbackUrl: string;
  mobileAppRedirectUri: string;
}
