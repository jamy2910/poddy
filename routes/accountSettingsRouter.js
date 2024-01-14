import express from 'express';
import { authenticateUser } from '../middleware/autheticateUser.js'
import { getAccountSettings, updateAccountSettings } from '../controllers/accountSettingsController.js';

const accountSettingsRouter = express.Router();

accountSettingsRouter.get('/', authenticateUser, getAccountSettings) // Gets a users settings based on ID
accountSettingsRouter.patch('/', authenticateUser, updateAccountSettings) // Edits a users account settings

export default accountSettingsRouter;