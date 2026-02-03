import "./types/express";
import { connectDatabase } from "./db";
import { env } from "./config/env";
import { Logger } from "./utils/logger";
import { createApp } from "./app";

const logger = new Logger(env.logLevel);

const app = createApp();

async function bootstrap(): Promise<void> {
  try {
    logger.debug("Starting application", { env: env.nodeEnv });
    logger.debug("Loading configuration", {
      port: env.port,
      mongoHost: env.mongoHost,
      mongoDb: env.mongoDb
    });
    await connectDatabase();
    app.listen(env.port, () => {
      logger.debug("Server listening", { url: `http://localhost:${env.port}` });
    });
  } catch (error) {
    logger.error("Startup failed", {
      message: error instanceof Error ? error.message : "Unknown error"
    });
    process.exit(1);
  }
}

void bootstrap();
