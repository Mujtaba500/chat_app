import prisma from "../../db/config.js";
import { Request, Response } from "express";
import { createToken, hashPassword } from "../../utils/auth.js";

const authController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { username, fullName, password } = req.body;

      const usernameExists = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (usernameExists) {
        return res.status(400).json({
          message: "Username already exists",
        });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          username,
          fullName,
          password: hashedPassword,
        },
      });

      const token = createToken(newUser.id, newUser.username);

      res
        .status(201)
        .cookie("jwt", token, {
          maxAge: 15 * 24 * 60 * 60 * 1000, // MS
          httpOnly: true, // prevent xss attacks
          sameSite: "strict",
          secure: process.env.STAGE !== "development", // HTTPS
        })
        .json({
          message: "User created successfully",
          token,
        });
    } catch (err: any) {
      console.log("Error while registering user");
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  login: async (req: Request, res: Response) => {},
  logout: async (req: Request, res: Response) => {},
};

export default authController;
