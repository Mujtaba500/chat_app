import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const createToken = (userId: string, username: string) => {
  const dataToSign = {
    userId,
    username,
  };

  const token = jwt.sign(dataToSign, process.env.JWT_SECRET!);

  return token;
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export { createToken, hashPassword, comparePasswords };
