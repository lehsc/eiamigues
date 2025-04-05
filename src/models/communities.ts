import { CommunityFollowers } from "./community_followers.js"
import { CommunityRules } from "./community_rules.js"
import { Users } from "./users.js"

export type Communities = {
    id: number,
	creator_id: number,
    name: string,
	description: string,
	created_at: Date,
    publicly_visible: boolean,
    rules?: CommunityRules[],
    mods?: Users[],
    community: CommunityFollowers[]
}

export const baseCommunities: Communities = {
    id: 0,
	creator_id: 0,
    name: "",
	description: "",
	created_at: new Date(),
    publicly_visible: false,
    community: [],
    mods: [],
    rules: []
}