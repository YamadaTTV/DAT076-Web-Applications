import express from "express";
import { userRouter } from "./router/User";

export const app = express();

app.use(express.json());
app.use("/user", userRouter);