export type CommunityFollowers = {
 id: number
 community_id: number
 user_id: number
 joined_at: Date
}

export const baseCommunityFollowers: CommunityFollowers = {
    id: 0,
    community_id: 0,
    user_id: 0,
    joined_at: new Date()
   }