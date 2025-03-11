// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'

import userRouter from "./controllers/users";
import postRouter from "./controllers/posts";
import attribRouter from "./controllers/attributes";
import postAttribRouter from "./controllers/post_attributes";
import answerRouter from "./controllers/answers";


dotenv.config(); // loads the environment variables from a .env file into process.env

const app: Express = express(); // creates an Express instance
const port = process.env.PORT;  

// Middleware configuration
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // converts the incoming data into a JS obj and makes it accessible through req.body
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