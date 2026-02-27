import { Field, ObjectType } from "@nestjs/graphql";
import { AuthProvider } from "../enum/auth-provider.enum";
import { Role } from "../enum/role.enum";
import { Status } from "../enum/status.enum";

@ObjectType({ description: "User Model" })
export class UserInfo {
  @Field(() => String, { nullable: false, description: "User Id" })
  id!: string;

  @Field(() => String, { nullable: true, description: "Email" })
  email?: string;

  @Field(() => String, { nullable: true, description: "Kakao User Id" })
  kakaoId?: string;

  @Field(() => AuthProvider, { nullable: false, description: "Auth Provider" })
  authProvider!: keyof typeof AuthProvider;

  @Field(() => Role, { nullable: false, description: "Role" })
  role!: keyof typeof Role;

  @Field(() => Status, { nullable: false, description: "Status" })
  status!: keyof typeof Status;

  @Field(() => Date, { nullable: false, description: "Created At" })
  createdAt!: Date;

  @Field(() => Date, { nullable: false, description: "Updated At" })
  updatedAt!: Date;
}
