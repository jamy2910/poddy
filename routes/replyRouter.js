import express from 'express';
import { authenticateUser } from '../middleware/autheticateUser.js';
import { DeleteReply, getAllReplies, postReply } from '../controllers/replyController.js'


const replyRouter = express.Router();

replyRouter.post('/:commentId', authenticateUser, postReply); // Post a reply to a comment based on comment ID
replyRouter.delete('/:replyId', authenticateUser, DeleteReply); // Delete a reply based on reply ID
replyRouter.get('/:commentId', getAllReplies) // Get all replies that belong to a comment based on ID

export default replyRouter;