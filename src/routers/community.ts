import {Router} from 'express'
import * as communityController from '../controllers/community.js'
const communityRouter = Router()
communityRouter.get('/:name', communityController.getCommunity)
communityRouter.post('/', communityController.createCommunity)
communityRouter.post('/follow', communityController.followCommunity)
communityRouter.post('/unfollow',communityController.unfollowCommunity)
communityRouter.patch('/',communityController.updateCommunity)
export default communityRouter;