import { PostEngaments } from "./post_engaments.js"

export type Posts = {
    id: number,
	post_id?: number
	user_id: number
	community_id?: number
	comment: boolean
	adults_only: boolean
	status: number
	title: string,
	content: string,
	created_at: Date
	engagements?: PostEngaments
}

export const basePosts: Posts = {
	id: 0,
	post_id: 0,
	user_id: 0,
	community_id: 0,
	comment: false,
	adults_only: false,
	status: 0,
	title: "",
	content: "",
	created_at: new Date()
}