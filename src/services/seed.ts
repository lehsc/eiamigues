import { Users } from "../models/users.js";
import { knexClient } from "../config/db.js";
import { faker, FoodModule } from '@faker-js/faker';
import { Communities } from "../models/communities.js";
import { Posts } from "../models/posts.js";
import { PostEngaments } from "../models/post_engaments.js";
import { UserFollowers } from "../models/user_followers.js";
import { CommunityFollowers } from "../models/community_followers.js";
const user = async () => {
    try {
        const db = knexClient()
        const user = await db.count('* as result').from('users')
        if(user[0].result as number <= 1000){
            const users = []
            for(let i = 0; i < 999; i++){
                const user: Partial<Users> = {}
                user.name = faker.person.fullName()
                user.email = faker.internet.exampleEmail()
                user.adults_only = faker.datatype.boolean()
                user.dob = faker.date.birthdate()
                user.anonymous = faker.datatype.boolean()
                user.gender = faker.number.int({min: 0, max: 10})
                user.status = faker.number.int({min: 0, max: 10})
                user.pwd = faker.internet.password()
                if(i !== 998 && user){
                    users.push(user)
                }
    
            }
            
            for(let currentUser of users) {
                await db<Users>('users').insert({name: currentUser.name, email: currentUser.email,
                adults_only: currentUser.adults_only,  dob: currentUser.dob,
                gender: currentUser.gender, pwd: currentUser.pwd, status: currentUser.status})
            }
    
    
    
    
        }
    } catch (error) {
        console.log(error)
    }

}


const communities = async() => {
    const communities = []
    const db = knexClient()
    const users = await db.select('id').from<Pick<Users, "id">>('users')
    const communitiesData = await db.select('id').from<Pick<Communities, "id">>('communities')
    let id = communitiesData.length > 0  ? communitiesData[communitiesData.length - 1].id + 1 : 0  
    for(let i = 0; i < 999; i++){
    const community: Partial<Communities> = {}
    community.id = id;
    community.name = faker.word.verb() + id
    community.publicly_visible = faker.datatype.boolean()
    community.creator_id = users[faker.number.int({min:0, max: 998})].id
    community.description = faker.commerce.productDescription()
    community.created_at = new Date()
    if(i !== 998){
        communities.push(community)
    }
    id++
}

for(let community of communities)  {
    await db('communities').insert(community)
}
}


const posts = async() => {
    const posts = []
    const db = knexClient()
    const users = await db.select('id').from<Pick<Users, "id">>('users')
    const communities = await db.select('id').from<Pick<Communities, "id">>('communities')
    for(let i = 0; i < 999; i++){
    const post: Partial<Posts> = {}
    post.status = faker.number.int({min:0, max: 6})
    post.title = faker.word.words()
    post.user_id = users[faker.number.int({min:0, max: 998})].id
    post.content = faker.word.words()
    post.adults_only = faker.datatype.boolean()
    if(post.user_id % 2) post.community_id = communities[faker.number.int({min:0, max: 998})].id
    if(i !== 998){
        posts.push(post)
    }

}


for(let post of posts) {
    await db.table('posts').insert(post)
}

}

const postEngaments = async() => {
    const postEngaments = []
    const db = knexClient()
    const posts = await db.select('id').from<Pick<Posts, "id">>('posts')
    const postEngamentsData = await db.select('id').from<Pick<PostEngaments, "id">>('post_engagements').orderBy('id', "desc")
    let id = 0
    if(postEngamentsData.length) id = postEngamentsData[0].id
    for(let i = 0; i < 999; i++){
    id++
    const post: Partial<PostEngaments> = {}
    post.id = id
    post.post_id = posts[faker.number.int({min:0, max: 998})].id
    post.liked = faker.datatype.boolean()
    post.disliked = faker.datatype.boolean()
    post.seen = faker.datatype.boolean()
    post.user_id = 1
    if(i !== 998 && post){
        postEngaments.push(post)
    }

}

for(let post of postEngaments) 
    await db.table('post_engagements').insert({
    id, user_id: 1, post_id: post.post_id, 
    liked: post.liked, disliked: post.disliked,
    seen: post.seen, commented: faker.datatype.boolean()}
    )

}
const userFollowers = async () => {
    const userFollowers = []
    const db = knexClient()
    const followers = await db.select('id').from<Pick<Users, "id">>('users')
    const userFollowersData = await db.select('id').from<Pick<UserFollowers, "id">>('user_followers').orderBy('id', "desc")
    let id = 0
    if(userFollowersData.length) id = userFollowersData[0].id
    for(let i = 0; i < 999; i++){
    id++
    const user: Partial<UserFollowers> = {}
    user.id = id
    user.followed_user_id = followers[faker.number.int({min:0, max: 998})].id
    user.follower_user_id = followers[faker.number.int({min:0, max: 998})].id
    user.joined_at = faker.date.anytime()
    if(i !== 998 && user){
        userFollowers.push(user)
    }

}


for(let follower of userFollowers) await db.table('user_followers').insert(follower)


}

const communityFollowers = async () => {
    const communityFollowers = []
    const db = knexClient()
    const followers = await db.select('id').from<Pick<Users, "id">>('users')
    const communities = await db.select('id').from<Pick<Communities, "id">>('communities')
    const communityFollowersData = await db.select('id').from<Pick<UserFollowers, "id">>('community_followers').orderBy('id', "desc")
    let id = 0
    if(communityFollowersData.length) id = communityFollowersData[0].id
    for(let i = 0; i < 999; i++){
    id++
    const communityfollower: Partial<CommunityFollowers> = {}
    communityfollower.id = id
    communityfollower.user_id = followers[faker.number.int({min:0, max: 998})].id
    communityfollower.community_id = communities[faker.number.int({min:0, max: 998})].id
    communityfollower.joined_at = faker.date.anytime()
    if(i !== 998){
        communityFollowers.push(communityfollower)
    }

}

for(let follower of communityFollowers)  await db.table('community_followers').insert(follower)


}

export {user, communities, posts, postEngaments, userFollowers, communityFollowers}