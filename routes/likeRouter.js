import express from 'express';
import { authenticateUser } from '../middleware/autheticateUser.js';
import { getUsersLikes, likeEpisode } from '../controllers/likeController.js';

const likeRouter = express.Router();

likeRouter.get('/:episodeId') // Get the amount of likes on a podcast
likeRouter.get('/', authenticateUser, getUsersLikes) // Get a users liked episodes
likeRouter.post('/:episodeId', authenticateUser, likeEpisode) // Like an episode....seems simple enough
likeRouter.delete('/:episodeId') // Unlike....nuff said

export default likeRouter;