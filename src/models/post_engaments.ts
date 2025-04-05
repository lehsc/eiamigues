export type PostEngaments = {
    id: number,
    post_id: number,
    user_id: number,
    liked: boolean
    disliked: boolean,
    seen: boolean
    like_count: number,
    dislike_count: number,
    seen_count: number,
    comments_count: number
}

export const basePostEngaments = {
    id: 0,
    post_id: 0,
    user_id: 0,
    liked: false,
    disliked: false,
    seen: false,
    like_count: 0,
    dislike_count: 0,
    seen_count: 0,
    comments_count: 0
}