import { Request, Response } from "express";
import prisma from "../../db/config.js";

const messageController = {
  sendMessage: async (req: Request, res: Response) => {
    try {
      const senderId = req.user.id;
      const { message } = req.body;
      const recipentId = req.params.id;

      // check if convo already exists
      let conversation = await prisma.conversation.findFirst({
        where: {
          userIds: {
            hasEvery: [senderId, recipentId],
          },
        },
      });

      if (!conversation) {
        //   Create new convo
        conversation = await prisma.conversation.create({
          data: {
            userIds: [senderId, recipentId],
          },
        });
      }

      const newMessage = await prisma.message.create({
        data: {
          senderId,
          body: message,
          conversationId: conversation!.id,
        },
      });

      res.status(200).json({
        message: "Message sent",
        data: newMessage,
      });
    } catch (err: any) {
      console.log("Error in send message controller", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default messageController;
