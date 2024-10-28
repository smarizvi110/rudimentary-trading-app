import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemsOffered: [String],
    cashOffered: {
        type: Number,
        default: 0
    },
    trade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trade',
        required: true
    }
  });

export const Offer = mongoose.model('Offer', offerSchema);
