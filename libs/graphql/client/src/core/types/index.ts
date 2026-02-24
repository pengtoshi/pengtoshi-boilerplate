import type { GQLReturnType } from "../client/graphql";
import type { findUser } from "../requests/queries/findUser";

export type UserResponse = NonNullable<GQLReturnType<typeof findUser>["findUser"]>;
