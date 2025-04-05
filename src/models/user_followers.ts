export type UserFollowers = {
 id: number
 followed_user_id: number
 follower_user_id: number
 joined_at: Date
}

export const baseUserFollowers: UserFollowers = {
    id: 0,
    followed_user_id: 0,
    follower_user_id: 0,
    joined_at: new Date
}