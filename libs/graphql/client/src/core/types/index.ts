import type { GQLReturnType } from "../client/graphql";
import type { findUser } from "../requests/queries/findUser";

export type User = NonNullable<GQLReturnType<typeof findUser>["findUser"]>;
