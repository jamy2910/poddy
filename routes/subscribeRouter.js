import express from 'express';

import { getSubscriberCount, subscribeToPodcast, unsubscribeFromPodcast } from '../controllers/subscribeController.js';

const subscribeRouter = express.Router();

subscribeRouter.get('/:podcastId', getSubscriberCount) // Get the subscriber count of a podcast

subscribeRouter.post('/:podcastId', subscribeToPodcast) // Subscribe to a podcast

subscribeRouter.delete('/podcastId', unsubscribeFromPodcast) // You guessed it........unsubscribe (these comments are only here because you will forget the layout of the API that YOU BUILT)

export default subscribeRouter;