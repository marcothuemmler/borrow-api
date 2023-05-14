declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_TYPE: any;
      PG_HOST: string;
      PG_PORT: number;
      PG_USER: string;
      PG_PASSWORD: string;
      PG_DB: string;
    }
  }
}

export {};
