import { Post_Engaments } from "./post_engaments"

export type Posts = {
    id: number,
	post_id: number
	user_id: number,
	comment: boolean
	adults_only: boolean
	status: boolean
	title: string,
	content: string,
	created_at: Date
	engagements?: Post_Engaments
}