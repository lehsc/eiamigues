// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getUsers } from "./services/user";
import userRouter from "./controllers/users";
import cors from 'cors'
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;  
app.use(express.json());             // for application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/user', userRouter)
app.get("/", async(req: Request, res: Response) => {
  await getUsers()
  res.send("Express ");
});



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});