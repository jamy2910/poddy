import express from 'express';

import { uploadComment, deleteComment, getComments } from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post('/:episodeId', uploadComment) // Upload a comment

commentRouter.get('/:episodeId', getComments) // Get all comments for an episode

commentRouter.delete('/:commentId', deleteComment) // Delete a comment (make sure user owns the comment)

export default commentRouter