import express from 'express';
import { getCurrentProfile, getSingleProfile, deleteProfile, editProfile } from '../controllers/profileController.js';
import { authenticateUser } from '../middleware/autheticateUser.js';

const profileRouter = express.Router();

profileRouter.get('/', authenticateUser, getCurrentProfile) // Gets the current profile
profileRouter.get('/:profId', getSingleProfile) // Gets a single profile from ID

profileRouter.delete('/', authenticateUser, deleteProfile) // Deletes a profile based on ID (auth required) || Also log user out after deletion

profileRouter.patch('/', authenticateUser, editProfile) // Edits a profile based on ID (auth required)

export default profileRouter