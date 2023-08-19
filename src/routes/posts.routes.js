import { Router } from "express";
import { publish, edit, remove } from "../controllers/posts.controller.js";
import { validateAuth } from "../middlewares/auth.middlewares.js";

const postsRouter = Router();

postsRouter.post("/publish", validateAuth, publish);
postsRouter.put("/edit/:id", validateAuth, edit);
postsRouter.delete("/delete/:id", validateAuth, remove);

export default postsRouter;
