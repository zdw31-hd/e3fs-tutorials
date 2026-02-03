import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { getHomeModel, getModeratorModel, getProfileModel } from "../services/pageService";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", getHomeModel());
});

router.get("/profile", requireAuth, (req, res) => {
  res.render("profile", getProfileModel());
});

router.get("/moderator", requireAuth, requireRole(["moderator", "admin"]), (req, res) => {
  res.render("moderator", getModeratorModel());
});

export default router;
