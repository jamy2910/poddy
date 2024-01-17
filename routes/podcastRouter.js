import express from 'express';
import { getAllPodcasts, getSinglePodcast, createPodcast, deletePodcast, editPodcast, podcastFromChannel, requestUploadUrl } from '../controllers/podcastController.js'
import { authenticateUser } from '../middleware/autheticateUser.js';
import { upload } from '../middleware/multerMiddleware.js';
import { validatePodcastUpload } from '../middleware/validation.js';

const podcastRouter = express.Router();

podcastRouter.get('/', getAllPodcasts); // Get all podcasts (based on query params)
podcastRouter.get('/:podcastId', getSinglePodcast); // Gets a single podcasts based on ID
podcastRouter.get('/upload/uploadpodcast', authenticateUser, requestUploadUrl) // Gets an upload URL
podcastRouter.get('/channel/:channelId', podcastFromChannel); // Gets podcasts based on channel

podcastRouter.post('/:channelId', authenticateUser, upload.fields([{ name: 'file', maxCount: 1 },
{ name: 'thumbnail', maxCount: 1 }]), validatePodcastUpload, createPodcast); // Creates a podcast

podcastRouter.delete('/:podcastId', authenticateUser, deletePodcast); // Deletes a podcast (check user auth)
podcastRouter.patch('/:id', authenticateUser, upload.single('thumbnail'), editPodcast); // Edit a podcast (check user auth)


export default podcastRouter;