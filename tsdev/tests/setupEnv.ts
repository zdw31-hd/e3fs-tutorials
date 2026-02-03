import dotenv from "dotenv";

dotenv.config();

process.env.NODE_ENV = "test";
process.env.LOG_LEVEL = "error";
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test_secret";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";
process.env.JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? "token";

// Prefer a dedicated test DB to avoid deleting dev data.
const baseDb = process.env.MONGO_DB ?? "tsdev";
process.env.MONGO_DB =
  process.env.MONGO_DB_TEST ?? `${baseDb}_test`;

process.env.MONGO_HOST = process.env.MONGO_HOST ?? "localhost:27017";
process.env.MONGO_AUTH_SOURCE = process.env.MONGO_AUTH_SOURCE ?? "admin";
process.env.MONGO_USER = process.env.MONGO_USER ?? "";
process.env.MONGO_PASS = process.env.MONGO_PASS ?? "";
