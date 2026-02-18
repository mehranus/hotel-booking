

export default () => ({
  port: process.env.PORT,

  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ,
  },

  rabbitmq: {
    url: process.env.RABBITMQ_URL,
  },
});

