// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import * as seeder from "./services/seed.js";
import userRouter from "./routers/users.js";
import postRouter from "./routers/posts.js";
import attribRouter from "./routers/attributes.js";
import postAttribRouter from "./routers/post_attributes.js";
import communityRouter from "./routers/community.js";


dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// if(process.env.NODE_ENV === "development"){
   // user()
// }

// Routes
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/community', communityRouter)
app.use('/attribute', attribRouter)
app.use('/post_attribute', postAttribRouter)

// Root route
app.get("/", async (req: Request, res: Response) => {
  try {
  res.send("Express ");
  // const user = await seeder.user()
  // const community = await seeder.communities()
  // const post = await seeder.posts()
  // const userFollowers = await seeder.userFollowers()
  // const communityfollower = await seeder.communityFollowers()
  // const postEngament = await seeder.postEngaments()
  } catch (error) {
   console.log(error) 
  }
  
});

// Starting the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
