import { Router } from "express";
import authController from "../../controllers/auth/index.js";
import authValidator from "../../validators/auth/index.js";

const authRouter = Router();

authRouter.post(
  "/auth/signup",
  authValidator.createUser,
  authController.createUser
);

authRouter.post("/auth/login", authValidator.login, authController.login);

authRouter.post("auth/logout", authController.logout);

export default authRouter;
