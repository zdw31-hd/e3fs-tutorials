import { Router } from "express";
import { env } from "../config/env";
import { Logger } from "../utils/logger";
import { loginUser, registerUser } from "../services/authService";

const router = Router();
const logger = new Logger(env.logLevel);

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", error: null });
});

router.post("/register", async (req, res) => {
  const email = String(req.body.email ?? "").trim().toLowerCase();
  const password = String(req.body.password ?? "");
  const result = await registerUser(email, password);

  if (!result.ok) {
    res.render("register", { title: "Register", error: result.error });
    return;
  }

  res.redirect("/login?registered=1");
});

router.get("/login", (req, res) => {
  const registered = req.query.registered === "1";
  res.render("login", { title: "Login", error: null, registered });
});

router.post("/login", async (req, res) => {
  const email = String(req.body.email ?? "").trim().toLowerCase();
  const password = String(req.body.password ?? "");
  const result = await loginUser(email, password);

  if (!result.ok) {
    res.render("login", {
      title: "Login",
      error: result.error,
      registered: false
    });
    return;
  }

  res.cookie(env.jwtCookieName, result.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.nodeEnv === "production"
  });

  res.redirect("/profile");
});

router.post("/logout", (req, res) => {
  logger.debug("Logout");
  res.clearCookie(env.jwtCookieName);
  res.redirect("/");
});

export default router;
