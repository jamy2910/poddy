import express from 'express';
import { upload } from '../middleware/multerMiddleware.js';
import { createChannel, deleteChannel, editChannel, getChannels, getSingleChannel, getUserChannels } from '../controllers/channelController.js';
import { authenticateUser } from '../middleware/autheticateUser.js';

const channelRouter = express.Router();

channelRouter.get('/', getChannels); // Gets all channels (based on query parameters)
channelRouter.get('/user', authenticateUser, getUserChannels);
channelRouter.get('/:channelID', getSingleChannel); // Gets a single channel based on ID

channelRouter.post('/', authenticateUser, upload.single('channelPic'), createChannel) // Creates a channel

channelRouter.delete('/:channelID', authenticateUser, deleteChannel) // Deletes a channel

channelRouter.patch('/:channelId', authenticateUser, upload.single('channelPic'), editChannel) // Edits a channel

export default channelRouter;