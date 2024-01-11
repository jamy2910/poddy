import express from 'express';
import {getAllPodcasts, getSinglePodcast, createPodcast, deletePodcast, editPodcast} from '../controllers/podcastController.js'
import { authenticateUser } from '../middleware/autheticateUser.js';
import { upload } from '../middleware/multerMiddleware.js';

const podcastRouter = express.Router();

podcastRouter.get('/', getAllPodcasts);
podcastRouter.get('/:podcastId', getSinglePodcast);

podcastRouter.post('/:channelId', authenticateUser, upload.single('thumbnail'), createPodcast);

podcastRouter.delete('/:podcastId', authenticateUser, deletePodcast);

podcastRouter.patch('/:id', authenticateUser, upload.single('thumbnail'), editPodcast);


export default podcastRouter;