import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const messageValidor = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    message: Joi.string().min(1).max(100).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error);
    let customErrMessage = error.details[0].message;
    customErrMessage = customErrMessage
      .split("")
      .filter((char) => {
        let result = char.match(/^[a-z0-9A-Z ]+$/);
        return result;
      })
      .join("");

    return res.status(400).json({
      message: "Invalid Credentials",
      details: customErrMessage,
    });
  }
  next();
};

export default messageValidor;
