export type CommunityMods = {
    id: number,
	community_id: number,
    user_id: number,
    roles: string,
	created_at: Date,
    updated_at: boolean
}

export const baseCommunityMods: CommunityMods = {
    id: 0,
	community_id: 0,
    user_id: 0,
    roles: "",
	created_at: new Date(),
    updated_at: false
}