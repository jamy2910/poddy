import express from 'express';
import { authenticateUser } from '../middleware/autheticateUser.js';
import { getUsersLikes, likeEpisode, unlikeEpisode } from '../controllers/likeController.js';

const likeRouter = express.Router();

likeRouter.get('/:episodeId') // Get the amount of likes on a podcast (NEVER MIND THIS)
likeRouter.get('/', authenticateUser, getUsersLikes) // Get a users liked episodes
likeRouter.post('/:podcastId', authenticateUser, likeEpisode) // Like an episode....seems simple enough
likeRouter.delete('/:podcastId', authenticateUser, unlikeEpisode) // Unlike....nuff said

export default likeRouter;