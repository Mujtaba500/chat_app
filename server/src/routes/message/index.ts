import { Router } from "express";
import protectRoute from "../../middleware/protectRoute.js";
import messageController from "../../controllers/message/index.js";

const messageRouter = Router();

// Send message
messageRouter.post(
  "/message/send/:id",
  protectRoute,
  messageController.sendMessage
);

export default messageRouter;
