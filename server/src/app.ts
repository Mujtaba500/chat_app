import express from "express";
import morgan from "morgan";
import { app, server } from "./socket/socket.js";
import "dotenv/config";
import allRoutes from "./routes/allRoutes.js";
import cookieparser from "cookie-parser";

const logger = morgan("dev");

app.use(logger);
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// query params encodd for us

app.use("/api", allRoutes);

app.use("/", (req, res) => {
  res.json({
    message: "API is live",
  });
});

export default server;
