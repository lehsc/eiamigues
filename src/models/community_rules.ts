export type CommunityRules = {
    id: number,
	community_id: number,
    user_id: number,
    title: string,
    description: string,
	created_at: Date,
    updated_at: boolean
}


export const baseCommunityRules: CommunityRules = {
    id: 0,
	community_id: 0,
    user_id: 0,
    title: "",
    description: "",
	created_at: new Date(),
    updated_at: false
}