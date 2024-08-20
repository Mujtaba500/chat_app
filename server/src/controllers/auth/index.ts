import prisma from "../../db/config.js";
import { Request, Response } from "express";
import {
  comparePasswords,
  createToken,
  hashPassword,
} from "../../utils/auth.js";

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
      console.log("Error while registering user", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const userCheck = await prisma.user.findUnique({
        where: {
          username: payload.username,
        },
      });

      if (!userCheck) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const passVerify = await comparePasswords(
        payload.password,
        userCheck.password
      );

      if (!passVerify) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }

      const token = createToken(userCheck.id, userCheck.username);

      res
        .status(200)
        .cookie("jwt", token, {
          maxAge: 15 * 24 * 60 * 60 * 1000, // MS
          httpOnly: true, // prevent xss attacks
          sameSite: "strict",
          secure: process.env.STAGE !== "development", // HTTPS
        })
        .json({
          message: "User logged in successfully",
        });
    } catch (err: any) {
      console.log("Error while logging in user", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
          username: req.user.username,
        },
        select: {
          id: true,
          username: true,
          fullName: true,
          profilePic: true,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      res.status(200).json({
        data: user,
      });
    } catch (err: any) {
      console.log("Error while authenticating current user", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie("jwt").status(200).json({
        message: "Logged out successfully",
      });
    } catch (err: any) {
      console.log("Error in logout Controller", err.message);

      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default authController;
