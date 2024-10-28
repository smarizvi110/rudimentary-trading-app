import express from 'express';
import { getTradeById, getAllTrades, getOpenTrades, createTrade, postOfferForTrade, acceptOfferForTrade } from '../controllers/tradeController.js';

const tradeRouter = express.Router();

tradeRouter.get('/open', getOpenTrades);
tradeRouter.get('/:tradeId', getTradeById);
tradeRouter.get('/', getAllTrades);
tradeRouter.post('/', createTrade);
tradeRouter.post('/offers', postOfferForTrade);
tradeRouter.post('/accept-offer/', acceptOfferForTrade);

export default tradeRouter;
