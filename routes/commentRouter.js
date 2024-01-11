import express from 'express';

import { uploadComment, deleteComment, getComments, getUserComments } from '../controllers/commentController.js';
import { authenticateUser } from '../middleware/autheticateUser.js';


const commentRouter = express.Router();

commentRouter.post('/:podcastId', authenticateUser, uploadComment) // Upload a comment

commentRouter.get('/:podcastId', getComments) // Get all comments for an episode
commentRouter.get('/', authenticateUser, getUserComments); // Gets all a single users comments

commentRouter.delete('/:commentId', authenticateUser, deleteComment) // Delete a comment (make sure user owns the comment)

export default commentRouter