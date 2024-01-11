import express from 'express';

const likeRouter = express.Router();

likeRouter.get('/:episodeId') // Get the amount of likes on a podcast
likeRouter.get('/') // Get a users liked episodes
likeRouter.post('/:episodeId') // Like an episode....seems simple enough
likeRouter.delete('/:episodeId') // Unlike....nuff said

export default likeRouter;