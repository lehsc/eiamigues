	import { UserFollowers } from "./user_followers.js"

	export type Users = {
		id: number,
		name: string,
		username: string,
		dob: Date,
		gender: number,
		email: string,
		pwd: string,
		anonymous: boolean
		adults_only: boolean
		status: number
		followers?: UserFollowers
	}

	export const baseUser: Users = {
		id: 0,
		name: "",
		username: "",
		dob: new Date(0),
		gender: 0,
		email: "",
		pwd: "",
		anonymous: false,
		adults_only: false,
		status: 0,
	  };