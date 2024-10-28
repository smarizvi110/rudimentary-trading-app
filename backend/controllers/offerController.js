import {Offer} from "../models/offer.js";

export const getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.offerId).populate('user')
        .populate('trade');
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
