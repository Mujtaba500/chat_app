import { Router } from "express";
import authRouter from "./auth/index.js";

const allRoutes: Router[] = [authRouter];

export default allRoutes;
