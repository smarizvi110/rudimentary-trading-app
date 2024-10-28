import {Trade} from '../models/trade.js';
import {User} from "../models/user.js";
import {Offer} from "../models/offer.js";

export const getAllTrades = async (req, res) => {
    try {
        const trades = await Trade.find();
        res.status(200).json(trades);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOpenTrades = async (req, res) => {
    try {
        const openTrades = await Trade.find({ acceptedOffer: { $exists: false } });
        res.status(200).json(openTrades);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createTrade = async (req, res) => {
    try {
        const { userId } = req.body;
        const newTrade = new Trade(req.body);
        const savedTrade = await newTrade.save();

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.trades.push(savedTrade._id);
        await user.save();

        res.status(201).json(savedTrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const postOfferForTrade = async (req, res) => {
    const { tradeId, userId, ...offerDetails } = req.body;
    try {
        const trade = await Trade.findById(tradeId);
        if (!trade) {
            res.status(404).json({ message: 'Trade not found' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const newOffer = new Offer({
            trade: tradeId,
            user: userId,
            ...offerDetails
        });
        const savedOffer = await newOffer.save();

        trade.offers.push(savedOffer._id);
        await trade.save();

        user.offers.push(savedOffer._id);
        await user.save();

        res.status(201).json(savedOffer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const acceptOfferForTrade = async (req, res) => {
    const { tradeId, offerId } = req.body;
    try {
        const trade = await Trade.findById(tradeId);
        if (!trade) {
            res.status(404).json({ message: 'Trade not found' });
            return;
        }
        if (trade.acceptedOffer) {
            res.status(400).json({ message: 'Trade already has an accepted offer.' });
            return;
        }
        trade.acceptedOffer = offerId;
        await trade.save();
        res.status(200).json(trade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTradeById = async (req, res) => {
    try {
        const trade = await Trade.findById(req.params.tradeId);
        if (!trade) {
            return res.status(404).json({ message: 'Trade not found' });
        }
        res.status(200).json(trade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};