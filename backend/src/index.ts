// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'

import userRouter from "./routers/users";
import postRouter from "./routers/posts";
import attribRouter from "./routers/attributes";
import postAttribRouter from "./routers/post_attributes";
import answerRouter from "./routers/answers";


dotenv.config(); 
const app: Express = express(); 
const port = process.env.PORT;  
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
app.get("/", async(req: Request, res: Response) => {
  res.send("Express ");
});

// Starting the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});