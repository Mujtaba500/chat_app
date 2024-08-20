import { Router } from "express";
import authRouter from "./auth/index.js";
import messageRouter from "./message/index.js";

const allRoutes: Router[] = [authRouter, messageRouter];

export default allRoutes;
