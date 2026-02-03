import type { NextFunction, Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import type { Role } from "../models/User";

export type AuthPayload = {
  userId: string;
  role: Role;
};

function getTokenFromRequest(req: Request): string | null {
  const cookieToken = req.cookies?.[env.jwtCookieName];
  if (typeof cookieToken === "string" && cookieToken.length > 0) {
    return cookieToken;
  }

  const header = req.headers.authorization;
  if (typeof header === "string" && header.startsWith("Bearer ")) {
    return header.slice(7);
  }

  return null;
}

export function signAccessToken(payload: AuthPayload): string {
  const options: SignOptions = {
    subject: payload.userId,
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  };

  return jwt.sign(
    { role: payload.role },
    env.jwtSecret,
    options
  );
}

export function verifyAccessToken(token: string): AuthPayload {
  const decoded = jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;
  if (typeof decoded.sub !== "string") {
    throw new Error("Invalid token payload");
  }

  return {
    userId: decoded.sub,
    role: decoded.role as Role
  };
}

export function attachUser(req: Request, res: Response, next: NextFunction): void {
  const token = getTokenFromRequest(req);
  if (!token) {
    res.locals.auth = null;
    next();
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.auth = payload;
    res.locals.auth = payload;
  } catch {
    res.locals.auth = null;
  }

  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = getTokenFromRequest(req);
  if (!token) {
    res.redirect("/login");
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.auth = payload;
    res.locals.auth = payload;
    next();
  } catch {
    res.redirect("/login");
  }
}

export function requireRole(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      res.redirect("/login");
      return;
    }

    if (!roles.includes(req.auth.role)) {
      res.status(403).render("forbidden", { title: "Forbidden" });
      return;
    }

    next();
  };
}
