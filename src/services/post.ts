import { connectdb } from "../config/db.js";
import { Posts } from "../models/posts.js";
import { Filters } from "../types/response.js";

export const getPosts = async (filters: Partial<Filters>): Promise<Posts[]> => {
  const db = await connectdb()
  if (filters) {
    const posts = await db.query("SELECT * FROM posts WHERE id < $1 ORDER BY id DESC LIMIT $2", [filters.page, filters.offset])
    return posts.rows as Posts[]
  }
  const posts = await db.query("SELECT * FROM posts ORDER BY id DESC LIMIT $1")
  return posts.rows as Posts[]
}

export const getPost = async (id: number): Promise<Posts | null> => {
  const db = await connectdb()
  const post = await db.query("SELECT * FROM posts WHERE id = $1", [id])
  if (post) return post.rows[0] as Posts
  return null
}

export const getUserPosts = async (id: number, pageId?: number): Promise<Posts[]> => {
  const db = await connectdb()
  if (pageId) {
    const data = await db.query("SELECT p.title, p.content, p.created_at, c.id, c.name, c.publicly_visible, u.name, u.username, u.gender, " +
    "COUNT(CASE WHEN pg.liked = TRUE THEN 1 END) AS like_count, COUNT(CASE WHEN pg.disliked = TRUE THEN 1 END) AS dislike_count, " +
    "COUNT(CASE WHEN pg.commented = TRUE THEN 1 END) AS comment_count FROM posts p LEFT JOIN communities c on c.id = p.community_id " +
    "INNER JOIN users u on p.user_id = u.id LEFT JOIN post_engagements pg on pg.post_id = p.id WHERE u.id = $1 GROUP BY p.title, p.id, " +
    "p.content, p.created_at, c.id, c.name, c.publicly_visible, u.name, u.username, u.gender ORDER BY p.id DESC LIMIT 30", [id, pageId])
    return data.rows as Posts[]
  }
  else {
    const data = await db.query("SELECT * FROM posts p INNER JOIN users u on p.user_id = u.id WHERE u.id = $1 ORDER BY p.id DESC LIMIT 30", [id])
    return data.rows as Posts[]
  }

}

export const createPost = async (post: Posts): Promise<number> => {
  const db = await connectdb()
  const result = await db.query("INSERT INTO posts (user_id, title, content, created_at) VALUES ($1, $2, $3, $4) RETURNING id",
    [post.user_id, post.title, post.content, post.created_at])
  if (result.rows[0].id) return result.rows[0].id
  return 0;
}

export const updatePost = async (post: Posts): Promise<number> => {
  const db = await connectdb()
  const data = await getPost(post.id)

  if (data) {
    const result = await db.query("UPDATE posts SET user_id = $1, title = $2, content = $3, created_at = $4 WHERE id = $5 RETURNING id",
      [post.user_id, post.title, post.content, post.created_at, post.id])
    if (result.rows[0].id) return result.rows[0].id

    return 0;
  }

  return 0;
}

export const deletePost = async (id: number): Promise<boolean> => {
  const db = await connectdb()
  const isDeleted = await db.query("DELETE FROM posts WHERE id = $1 RETURNING 1 AS RESULT", [id])
  if (isDeleted) return true
  return false
}
export const getPostEngagements = async (id: number): Promise<Boolean> => {
  const db = await connectdb()
  const data = await db.query("SELECT p.id, p.title, p.content, p.created_at, p.adults_only, " +
  "u.username, u.name, u.gender, c.name, c.description, eng.COUNT(CASE WHEN eng.liked = TRUE) like_count, COUNT(CASE WHEN eng.disliked = TRUE) dislike_count, " + 
  "COUNT(CASE WHEN eng.commented = TRUE) comments_count, eng.liked, eng.disliked FROM users u JOIN posts p on u.id = p.user_id LEFT JOIN communities c " +
  "on p.community_id = c.id JOIN post_engagements eng on p.id = eng.post_id JOIN user_followers uf on uf.followed_user_id = u.id LEFT JOIN community_followers cf " +
  "ON cf.community_id = c.id WHERE uf.follower_user_id = $1 OR cf.user_id = $2 ORDER BY p.id DESC")
  
  return false
}

