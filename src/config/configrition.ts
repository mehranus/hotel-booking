export default () => ({
  port: parseInt(process.env.PORT || "3000", 10),

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379", 10),
  },

  rabbitmq: {
    url: process.env.RABBITMQ_URL,
  },
});

