import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

@InputType()
export class UserSignInWithKakaoCodeInput {
  @Field(() => String, { nullable: false, description: "카카오 authorization code" })
  @IsString()
  authorizationCode!: string;

  @Field(() => String, { nullable: false, description: "카카오 OAuth redirect URI" })
  @IsString()
  @IsUrl({ require_tld: false })
  redirectUri!: string;

  @Field(() => String, { nullable: false, description: "PKCE code verifier" })
  @IsNotEmpty()
  @IsString()
  codeVerifier!: string;
}
