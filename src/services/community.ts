import { connectdb, knexClient } from "../config/db.js";
import { baseCommunities, Communities } from "../models/communities.js";
import { CommunityFollowers } from "../models/community_followers.js";
import { CommunityRules } from "../models/community_rules.js";
import { Users, baseUser } from "../models/users.js";


export const followCommunity = async (user: CommunityFollowers): Promise<boolean> => {
    try {
        const db = knexClient()
        const lastId = await db.select('id').from<Pick<CommunityFollowers, "id">>('community_followers').orderBy("id", "desc").limit(1)
        const id = lastId[0].id + 1
        await db.table('community_followers').insert({ id, community_id: user.community_id, user_id: user.user_id })
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}

export const unfollowCommunity = async (user: CommunityFollowers): Promise<boolean> => {
    try {
        const db = knexClient()
        const communityFollowerId = await db.select('id').from<Pick<CommunityFollowers, "id" | "user_id" | "community_id">>('community_followers')
            .where("user_id", "=", user.user_id).andWhere("community_id", "=", user.community_id)
        const id = communityFollowerId[0].id

        if (id)
            await db.table('community_followers').where("id", id).delete()
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}


export const createCommunity = async (community: Communities): Promise<boolean> => {
    try {
        const db = knexClient()
        const lastId = await db.select('id').from<Pick<Communities, "id">>('communities').orderBy("id", "desc").limit(1)
        community.id = lastId[0].id + 1
        await db.table('communities').insert(community)
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}


export const updateCommunity = async (community: Communities): Promise<boolean> => {
    try {
        const db = knexClient()
        await db.table('communities').update(community).where("name", "=", community.name)
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}

export const getCommunity = async (name: string): Promise<Communities> => {
    try {
        const db = await connectdb()
        let data = await db.query("SELECT c.id, c.name, c.description, c.publicly_visible, c.created_at FROM communities c WHERE c.name = $1", [name])
        let communityData = data.rows as Communities[]
        if (communityData) {
            data = await db.query("SELECT u.name, u.username, u.gender, cr.title, cr.description FROM users u LEFT JOIN community_moderations cm " +
                "ON u.id = cm.user_id LEFT JOIN community_rulesets cr ON u.id = cr.user_id LEFT JOIN communities c on c.creator_id = u.id WHERE c.name = $1", [name])
            let community: Communities = {
                ...baseCommunities,
                created_at: communityData[0].created_at,
                description: communityData[0].description,
                id: communityData[0].id,
                name: communityData[0].name,
                publicly_visible: communityData[0].publicly_visible,
            }
            type CommunityFeatures = Users & CommunityRules;
            let i = 0
            for (let features of data.rows as CommunityFeatures[]) {
                community.mods?.push({
                    ...baseUser,
                    name: features.name,
                    username: features.username,
                    gender: features.gender
                })

                if (community.rules?.length) {
                    community.rules.push()
                    community.rules[i].title = features.title
                    community.rules[i].description = features.description
                }else community.rules?.push()


            }

            communityData = [community]

        }

        return communityData[0]
    } catch (error) {
        console.log(error)
        return { community: [], created_at: new Date(), creator_id: 0, description: "", id: 0, name: "", publicly_visible: false }
    }

}
