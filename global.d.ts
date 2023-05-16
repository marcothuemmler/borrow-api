declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CORS_ORIGIN: string;
      DB_TYPE: any;
      PG_HOST: string;
      PG_PORT: number;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_DB: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {};
