import { User, ROLES, isRole } from "../models/User";
import { Logger } from "../utils/logger";
import { env } from "../config/env";

const logger = new Logger(env.logLevel);

export async function listUsers() {
  return User.find().sort({ createdAt: -1 }).lean();
}

type UpdateRoleResult =
  | { ok: true }
  | { ok: false; error: string };

export async function updateUserRole(userId: string, role: string): Promise<UpdateRoleResult> {
  if (!isRole(role)) {
    logger.warn("Invalid role provided", { userId, role, allowed: ROLES });
    return { ok: false, error: "Invalid role" };
  }

  const updated = await User.findByIdAndUpdate(userId, { role });
  if (!updated) {
    logger.warn("Role update failed: user not found", { userId, role });
    return { ok: false, error: "User not found" };
  }

  logger.debug("Role updated", { userId, role });
  return { ok: true };
}

