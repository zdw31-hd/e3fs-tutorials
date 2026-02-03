import dotenv from "dotenv";
import type { LogLevel } from "../utils/logger";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? "3000"),
  mongoUser: process.env.MONGO_USER ?? "",
  mongoPass: process.env.MONGO_PASS ?? "",
  mongoHost: required("MONGO_HOST"),
  mongoDb: required("MONGO_DB"),
  mongoAuthSource: process.env.MONGO_AUTH_SOURCE ?? "admin",
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "2h",
  jwtCookieName: process.env.JWT_COOKIE_NAME ?? "token",
  logLevel: (process.env.LOG_LEVEL ?? "debug").toLowerCase() as LogLevel
};
