import {connectdb} from '../config/db'
import { Users } from '../models/users'

export const getUsers = async (): Promise<Users[]> => {
    const db = await connectdb()
    const users = await db.query("SELECT * FROM users order by id desc");
    return users.rows as Users[];
}

export const getUser = async(id: number): Promise<Users | null> => {
    const db = await connectdb()
    const user = await db.query("SELECT * FROM users where id = $1", [id])
    if(user) return user.rows[0] as Users;
    return null;
}

export const createUser = async(userData: Users): Promise<number> => {
    const db = await connectdb()
    const result = await db.query('INSERT INTO users (name, dob, gender, email, pwd, anonymous) VALUES ($1, $2, $3, $4, $5, $6) returning id', [userData.name, userData.dob, 
        userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0])
    if(result.rows[0].id) return result.rows[0].id
    return 0;
}

export const updateUser = async(userData: Users): Promise<number> => {
    const db = await connectdb()
    const user = await getUser(userData.id)
    if(user){
    const result = await db.query('UPDATE users SET name = $1, dob = $2, gender = $3, email = $4, pwd = $5, anonymous = $6 WHERE id = $7 returning id', [userData.name, userData.dob, 
        userData.gender, userData.email, userData.pwd, userData.anonymous ? 1 : 0, userData.id])
    if(result.rows[0].id) return user.id
    return 0;
    }

    return 0;
}

export const deleteUser = async(id: number): Promise<boolean> => {
    const db = await connectdb()
    const user = await getUser(id)
    const isDeleted = await db.query('DELETE FROM users WHERE id = $1 returning 1 as result', [id])
    if(isDeleted) return true
    return false;
}