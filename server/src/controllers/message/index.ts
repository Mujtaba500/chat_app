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
  getConvo: async (req: Request, res: Response) => {
    try {
      const userToChatId = req.params.id;
      const userId = req.user.id;

      const conversation = await prisma.conversation.findFirst({
        where: {
          userIds: {
            hasEvery: [userId, userToChatId],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      if (!conversation) {
        res.status(404).json({
          message: "No conversation",
        });
      }

      res.status(200).json({
        data: conversation?.messages,
      });
    } catch (err: any) {
      console.log("Error while fetching conversation", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getUsers: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;

      const users = await prisma.user.findMany({
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
          fullName: true,
          profilePic: true,
        },
      });

      if (!users) {
        res.status(404).json({
          message: "No users found",
        });
      }

      res.status(200).json({
        data: users,
      });
    } catch (err: any) {
      console.log("Error while fetching users", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default messageController;
