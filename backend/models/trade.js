import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer'
        }
    ],
    acceptedOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }
  });

export const Trade = mongoose.model('Trade', tradeSchema);
  