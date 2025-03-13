import { connectdb } from "../config/db";
import { Posts } from "../models/posts";
import { Filters } from "../types/response";

export const getPosts = async (filters: Partial<Filters>): Promise<Posts[]> => {
    const db = await connectdb()
    if(filters) {
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

    if (data){
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