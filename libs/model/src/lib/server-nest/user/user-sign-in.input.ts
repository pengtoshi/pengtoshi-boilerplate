import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class UserSignInInput {
  @Field(() => String, { nullable: false, description: "카카오 액세스 토큰" })
  @IsString()
  kakaoAccessToken!: string;
}
