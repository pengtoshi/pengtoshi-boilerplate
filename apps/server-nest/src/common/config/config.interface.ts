import type { ConfigType as CommonConfigType } from "@libs/nestjs-core";

export interface ConfigType extends CommonConfigType {
  kakao: KakaoConfig;
}

export interface KakaoConfig {
  userInfoUrl: string;
}
