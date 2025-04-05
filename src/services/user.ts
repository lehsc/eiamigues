import { connectdb } from '../config/db.js'
import { Posts } from '../models/posts.js';
import { Users } from '../models/users.js'

export const getUsers = async (): Promise<Users[]> => {
  const db = await connectdb()
  const users = await db.query("SELECT * FROM users order by id desc");
  return users.rows as Users[];
}

export const getUser = async (id: number): Promise<Users | null> => {
  const db = await connectdb()
  const user = await db.query("SELECT * FROM users where id = $1", [id])
  if (user) return user.rows[0] as Users;
  return null;
}

export const getUserPosts = async (id: number): Promise<Partial<Posts[]>> => {
  try {
    const db = await connectdb()
    const data = await db.query("SELECT p.title, p.content, p.created_at, c.id, c.name, c.publicly_visible, u.name, u.username, u.gender, " +
      "pg.liked, pg.disliked, pg.commented, COUNT(CASE WHEN pg.liked = TRUE THEN 1 END) AS like_count, COUNT(CASE WHEN pg.disliked = TRUE THEN 1 END) " +
      "AS dislike_count, COUNT(CASE WHEN pg.commented = TRUE THEN 1 END) AS comment_count FROM posts p LEFT JOIN communities c on c.id = p.community_id " +
      "INNER JOIN users u on p.user_id = u.id LEFT JOIN post_engagements pg on pg.post_id = p.id WHERE u.id = $1 GROUP BY p.title, p.id, " +
      "p.content, p.created_at, c.id, c.name, c.publicly_visible, u.name, u.username, u.gender, pg.liked, pg.disliked, pg.commented ORDER BY p.id DESC LIMIT 30", [id])
    return data.rows as Posts[]
  } catch (error) {
    console.log(error)
    return []
  }

}

export const createUser = async (userData: Users): Promise<number> => {
  const db = await connectdb()
  const result = await db.query('INSERT INTO users (name, dob, gender, email, pwd, anonymous) VALUES ($1, $2, $3, $4, $5, $6) returning id',
    [userData.name, userData.dob, userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0])
  if (result.rows[0].id) return result.rows[0].id
  return 0;
}
export const updateUser = async (userData: Users): Promise<number> => {
  const db = await connectdb()
  const user = await getUser(userData.id)
  if (user) {
    const result = await db.query('UPDATE users SET name = $1, dob = $2, gender = $3, email = $4, pwd = $5, anonymous = $6 WHERE id = $7 returning id',
      [userData.name, userData.dob, userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0, userData.id])
    if (result.rows[0].id) return user.id
    return 0;
  }

  return 0;
}

export const deleteUser = async (id: number): Promise<boolean> => {
  const db = await connectdb()
  const isDeleted = await db.query('DELETE FROM users WHERE id = $1 returning 1 as result', [id])
  if (isDeleted) return true
  return false;
}


