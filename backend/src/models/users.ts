import { User_Followers } from "./user_followers"

export type Users = {
    id: number,
	name: string,
	dob: Date,
	gender: number,
	email: string,
	pwd: string,
	anonymous: boolean
	adults_only: boolean
	status: boolean
	followers?: User_Followers
}