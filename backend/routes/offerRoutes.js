import express from 'express';
import { getOfferById } from '../controllers/offerController.js';

const offerRouter = express.Router();

offerRouter.get('/:offerId', getOfferById);

export default offerRouter;
