import mongoose from "mongoose";
import { env } from "./config/env";
import { Logger } from "./utils/logger";

const logger = new Logger(env.logLevel);

export function buildMongoUri(): string {
  const user = env.mongoUser ? encodeURIComponent(env.mongoUser) : "";
  const pass = env.mongoPass ? encodeURIComponent(env.mongoPass) : "";

  if (user && pass) {
    return `mongodb://${user}:${pass}@${env.mongoHost}/${env.mongoDb}?authSource=${env.mongoAuthSource}`;
  }

  return `mongodb://${env.mongoHost}/${env.mongoDb}`;
}

export async function connectDatabase(): Promise<void> {
  mongoose.set("strictQuery", true);
  const uri = buildMongoUri();
  await mongoose.connect(uri);
  logger.debug("MongoDB connected", { host: env.mongoHost, db: env.mongoDb });
}
