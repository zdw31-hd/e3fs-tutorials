import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { attachUser } from "./middleware/auth";
import pagesRouter from "./routes/pages";
import authRouter from "./routes/auth";
import adminRouter from "./routes/admin";

export function createApp() {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(process.cwd(), "views"));

  app.use(express.static(path.join(process.cwd(), "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(attachUser);

  app.use(pagesRouter);
  app.use(authRouter);
  app.use(adminRouter);

  app.use((req, res) => {
    res.status(404).render("not-found", { title: "Not Found" });
  });

  return app;
}

