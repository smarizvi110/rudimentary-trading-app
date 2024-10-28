import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import tradeRouter from "./routes/tradeRoutes.js";
import offerRouter from "./routes/offerRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/trades", tradeRouter);
app.use("/offers", offerRouter);
