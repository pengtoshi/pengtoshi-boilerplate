import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  AuthToken,
  AuthTokenInput,
  JwtPayload,
  Role,
  UserInfo,
  UserSignInInput,
  UserSignInWithKakaoCodeInput,
} from "@libs/model";
import { JwtAuthGuard, Roles, RolesGuard, UserDecoded } from "@libs/nestjs-core";
import { UserService } from "./user.service";

@Resolver(() => UserInfo)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => AuthToken)
  userSignIn(@Args("input") userSignInInput: UserSignInInput) {
    return this.userService.userSignIn(userSignInInput);
  }

  @Mutation(() => AuthToken)
  userSignInWithKakaoCode(@Args("input") input: UserSignInWithKakaoCodeInput) {
    return this.userService.userSignInWithKakaoCode(input);
  }

  @Mutation(() => AuthToken)
  refreshTokens(@Args("input") tokenInput: AuthTokenInput) {
    return this.userService.refreshTokens(tokenInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  signOut(@UserDecoded() payload: JwtPayload) {
    return this.userService.signOut(payload);
  }

  @UseGuards(RolesGuard)
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard)
  @Query(() => [UserInfo])
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserInfo)
  async findUser(@UserDecoded() payload: JwtPayload) {
    return this.userService.findUserById(payload.userId);
  }
}
