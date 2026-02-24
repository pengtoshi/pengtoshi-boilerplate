import { registerEnumType } from "@nestjs/graphql";

export enum AuthProvider {
  KAKAO = "KAKAO",
  // TODO: Add other auth providers here
}

registerEnumType(AuthProvider, {
  name: "AuthProvider",
  description: "인증 방식",
});
