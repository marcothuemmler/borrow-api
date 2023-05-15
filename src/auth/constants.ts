import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
