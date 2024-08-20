import { Router } from "express";
import authController from "../../controllers/auth/index.js";
import authValidator from "../../validators/auth/index.js";
import protectRoute from "../../middleware/protectRoute.js";

const authRouter = Router();

authRouter.post(
  "/auth/signup",
  authValidator.createUser,
  authController.createUser
);

authRouter.post("/auth/login", authValidator.login, authController.login);

authRouter.get("/auth/user", protectRoute, authController.getCurrentUser);

authRouter.post("/auth/logout", protectRoute, authController.logout);

export default authRouter;
