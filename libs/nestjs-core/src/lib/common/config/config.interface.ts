export interface ConfigType {
  nest: NestConfig;
  redis: RedisConfig;
  graphql: GraphqlConfig;
  jwt: JwtConfig;
  mixpanel: MixpanelConfig;
  defiLlama: DefiLlamaConfig;
}

export interface NestConfig {
  environment: string;
  port: number;
  clientDomain: string;
  databaseUrl: string;
  readOnlyDatabaseUrl: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string | undefined;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface JwtConfig {
  secret: string;
  expiredTime: string;
  refreshSecret: string;
  refreshExpiredTime: string;
}

export interface MixpanelConfig {
  token: string;
  disable: boolean;
}

export interface DefiLlamaConfig {
  baseUrl: string;
  accessKey: string;
}
