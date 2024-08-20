import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
  username: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username: string;
      };
    }
  }
}

const protectRoute = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = {
      id: decoded.userId,
      username: decoded.username,
    };
    req.user = user;

    next();
  } catch (err: any) {
    console.log("Error while verifying token", err.message);
    return res.status(401).json({ message: "UnAuthorized" });
  }
};

export default protectRoute;
