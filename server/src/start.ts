import express from "express";
import { userRouter } from "./router/User";
import { productRouter } from "./router/Product";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/product", productRouter)