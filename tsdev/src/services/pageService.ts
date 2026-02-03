import { Logger } from "../utils/logger";
import { env } from "../config/env";

const logger = new Logger(env.logLevel);

export function getHomeModel() {
  logger.debug("Render page", { page: "home" });
  return { title: "Home" };
}

export function getProfileModel() {
  logger.debug("Render page", { page: "profile" });
  return { title: "Profile" };
}

export function getModeratorModel() {
  logger.debug("Render page", { page: "moderator" });
  return { title: "Moderator" };
}

