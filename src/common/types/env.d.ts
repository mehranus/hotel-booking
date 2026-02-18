namespace NodeJS {
  interface ProcessEnv {
    PORT: number;

    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;

    REDIS_HOST: string;
    REDIS_PORT: number;

    RABBITMQ_URL: string;
  }
}
