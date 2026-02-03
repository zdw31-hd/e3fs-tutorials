import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Logger } from "../utils/logger";
import { env } from "../config/env";
import { signAccessToken } from "../middleware/auth";

const logger = new Logger(env.logLevel);

type RegisterResult =
  | { ok: true; userId: string }
  | { ok: false; error: string };

type LoginResult =
  | { ok: true; userId: string; role: string; token: string }
  | { ok: false; error: string };

export async function registerUser(email: string, password: string): Promise<RegisterResult> {
  try {
    logger.debug("Register attempt", { email });

    if (!email || password.length < 8) {
      logger.warn("Register validation failed", {
        email,
        passwordLength: password.length
      });
      return { ok: false, error: "Email required, password min 8 characters." };
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      logger.warn("Register failed: email already registered", { email });
      return { ok: false, error: "Email already registered." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const created = await User.create({ email, passwordHash, role: "user" });
    logger.debug("Register success", { userId: created.id, email });

    return { ok: true, userId: created.id };
  } catch (error) {
    logger.error("Register failed", {
      message: error instanceof Error ? error.message : "Unknown error"
    });
    return { ok: false, error: "Registration failed. Please try again." };
  }
}

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    logger.debug("Login attempt", { email });

    if (!email || !password) {
      logger.warn("Login validation failed", { email });
      return { ok: false, error: "Email and password required." };
    }

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Login failed: invalid credentials", { email });
      return { ok: false, error: "Invalid credentials." };
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      logger.warn("Login failed: invalid credentials", { email });
      return { ok: false, error: "Invalid credentials." };
    }

    const token = signAccessToken({ userId: user.id, role: user.role });
    logger.debug("Login success", { userId: user.id, email, role: user.role });

    return { ok: true, userId: user.id, role: user.role, token };
  } catch (error) {
    logger.error("Login failed", {
      message: error instanceof Error ? error.message : "Unknown error"
    });
    return { ok: false, error: "Login failed. Please try again." };
  }
}

