import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { KakaoAuthController } from "./kakao-auth.controller";
import { OAuthCallbackService } from "./oauth-callback.service";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [AuthModule],
  controllers: [KakaoAuthController],
  providers: [UserService, UserResolver, OAuthCallbackService],
  exports: [UserService],
})
export class UserModule {}
