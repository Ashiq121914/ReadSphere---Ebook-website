import { config as conf } from "dotenv";
// import { env } from "process";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  coudinaryCloud: process.env.COUDINARY_CLOUD,
  coudinaryApiKey: process.env.COUDINARY_API_KEY,
  coudinarySecret: process.env.COUDINARY_API_SECRET,
};

export const config = Object.freeze(_config);
