export type AuthModuleConfig = {
  jwtSecret: string;
  accessTokenExpiresIn?: number;
  refreshTokenExpiresIn?: number;
};
