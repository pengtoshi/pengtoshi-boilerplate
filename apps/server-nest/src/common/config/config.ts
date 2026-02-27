import type { ConfigType } from "./config.interface";

export const config = (): ConfigType => ({
  nest: {
    port: parseInt(process.env.PORT!, 10),
    environment: process.env.NEST_ENVIRONMENT!,
    clientDomain: process.env.NOTIFICATION_SITE_DOMAIN!,
    databaseUrl: process.env.PRISMA_DATABASE_URL!,
    readOnlyDatabaseUrl: process.env.READ_ONLY_PRISMA_DATABASE_URL!,
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!, 10),
    password: process.env.REDIS_PASSWORD!,
  },
  graphql: {
    playgroundEnabled: process.env.PLAYGROUND_ENABLED! === "true",
    schemaDestination: process.env.SCHEMA_DESTINATION!,
    sortSchema: process.env.SORT_SCHEMA! === "true",
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiredTime: process.env.JWT_EXPIRES_IN!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiredTime: process.env.JWT_REFRESH_EXPIRES_IN!,
  },
  mixpanel: {
    token: process.env.MIXPANEL_TOKEN!,
    disable: process.env.MIXPANEL_DISABLE === "true" || false,
  },
  kakao: {
    restApiKey: process.env.KAKAO_REST_API_KEY!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    tokenUrl: process.env.KAKAO_TOKEN_URL!,
    userInfoUrl: process.env.KAKAO_USER_INFO_URL!,
    mobileCallbackUrl: process.env.KAKAO_MOBILE_CALLBACK_URL!,
    mobileAppRedirectUri: process.env.KAKAO_MOBILE_APP_REDIRECT_URI!,
  },
});
