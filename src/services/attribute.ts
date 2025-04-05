import { connectdb } from "../config/db.js";
import { Attributes } from "../models/attributes.js";

export const getAttributes = async (): Promise<Attributes[]> => {
    const db = await connectdb()
    const attributes = await db.query("SELECT * FROM attributes ORDER BY id DESC")
    return attributes.rows as Attributes[]
}

export const getAttribute = async (id: number): Promise<Attributes | null> => {
    const db = await connectdb()
    const attribute = await db.query("SELECT * FROM attributes WHERE id = $1", [id])
    if (attribute) return attribute.rows[0] as Attributes
    return null
}

export const createAttribute = async (attribute: Attributes): Promise<number> => {
    const db = await connectdb()
    const result = await db.query("INSERT INTO attributes (name) VALUES ($1) RETURNING id", [attribute.name])
    if (result.rows[0].id) return result.rows[0].id
    return 0;
}

export const updateAttribute = async (attribute: Attributes): Promise<number> => {
    const db = await connectdb()
    const data = await getAttribute(attribute.id)

    if (data){
        const result = await db.query("UPDATE attributes SET name = $1 WHERE id = $2 RETURNING id", [attribute.name, attribute.id])
        if (result.rows[0].id) return result.rows[0].id

        return 0;
    }

    return 0;
}

export const deleteAttribute = async (id: number): Promise<boolean> => {
    const db = await connectdb()
    const isDeleted = await db.query("DELETE FROM attributes WHERE id = $1 RETURNING 1 AS RESULT", [id])
    if (isDeleted) return true
    return false
}