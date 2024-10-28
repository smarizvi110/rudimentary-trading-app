import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    itemsOwned: {
        type: Number,
        default: 0
    },
    trades: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Trade' 
        }
    ],
    offers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Offer'
        }
    ]
});

export const User = mongoose.model('User', userSchema);
