// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'

import userRouter from "./routers/users.js";
import postRouter from "./routers/posts.js";
import attribRouter from "./routers/attributes.js";
import postAttribRouter from "./routers/post_attributes.js";
import answerRouter from "./routers/answers.js";


dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes
app.use('/user', userRouter)
app.use('/attribute', attribRouter)
app.use('/post', postRouter)
app.use('/post_attribute', postAttribRouter)
app.use('/answer', answerRouter)

// Root route
app.get("/", async (req: Request, res: Response) => {
  res.send("Express ");
});

// Starting the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
