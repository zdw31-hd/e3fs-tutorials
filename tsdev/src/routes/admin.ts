import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";
import { ROLES } from "../models/User";
import { listUsers, updateUserRole } from "../services/adminService";

const router = Router();

router.get("/admin/users", requireAuth, requireRole(["admin"]), async (req, res) => {
  const users = await listUsers();
  res.render("admin-users", { title: "User Admin", users, roles: ROLES });
});

router.post("/admin/users/:id/role", requireAuth, requireRole(["admin"]), async (req, res) => {
  const role = String(req.body.role ?? "");
  const result = await updateUserRole(req.params.id, role);
  if (!result.ok) {
    res.status(400).send(result.error);
    return;
  }

  res.redirect("/admin/users");
});

export default router;
