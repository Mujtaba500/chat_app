import { Router } from "express";
import protectRoute from "../../middleware/protectRoute.js";
import messageController from "../../controllers/message/index.js";
import messageValidor from "../../validators/message/index.js";

const messageRouter = Router();

// Send message
messageRouter.post(
  "/messages/send/:id",
  protectRoute,
  messageValidor,
  messageController.sendMessage
);

//Get messages
messageRouter.get("/messages/:id", protectRoute, messageController.getConvo);

// Get users for conversations
messageRouter.get("/users", protectRoute, messageController.getUsers);

export default messageRouter;
