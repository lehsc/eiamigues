import { connectdb } from "../config/db";
import { PostAttributes } from "../models/post_attributes"

export const getPostAttributes = async (): Promise<PostAttributes[]> => {
    const db = await connectdb()
    const postAttrib = await db.query("SELECT * FROM post_attributes ORDER BY id DESC")
    return postAttrib.rows as PostAttributes[]
}

export const getPostAttribute = async (id: number): Promise<PostAttributes | null> => {
    const db = await connectdb()
    const postAttrib = await db.query("SELECT * FROM post_attributes WHERE id = $1", [id])
    if (postAttrib) return postAttrib.rows[0] as PostAttributes
    return null
}

export const createPostAttribute = async (postAttrib: PostAttributes): Promise<number> => {
    const db = await connectdb()
    const result = await db.query("INSERT INTO post_attributes (post_id, attr_id) VALUES ($1, $2) RETURNING id",
        [postAttrib.post_id, postAttrib.attr_id])
    if (result.rows[0].id) return result.rows[0].id
    return 0;
}

export const updatePostAttribute = async (postAttrib: PostAttributes): Promise<number> => {
    const db = await connectdb()
    const data = await getPostAttribute(postAttrib.id)

    if (data){
        const result = await db.query("UPDATE post_attributes SET post_id = $1, attr_id = $2 WHERE id = $3 RETURNING id",
            [postAttrib.post_id, postAttrib.attr_id, postAttrib.id])
        if (result.rows[0].id) return result.rows[0].id

        return 0;
    }

    return 0;
}

export const deletePostAttribute = async (id: number): Promise<boolean> => {
    const db = await connectdb()
    const isDeleted = await db.query("DELETE FROM post_attributes WHERE id = $1 RETURNING 1 AS RESULT", [id])
    if (isDeleted) return true
    return false
}