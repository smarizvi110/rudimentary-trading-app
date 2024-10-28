import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import Navbar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTradeId } from '../store/tradeSlice';
import "./UserProfile.css";
import { Link } from 'react-router-dom';

interface User {
    _id: string;
    username: string;
    password: string;
    itemsOwned: number;
    trades: string[]; // Array of Trade IDs
    offers: string[]; // Array of Offer IDs
}

interface Trade {
    _id: string;
    title: string;
    userId: string; // User ID who created the trade
    description: string;
    conditions: string[];
    offers: string[]; // Array of Offer IDs
    acceptedOffer: string | null; // ID of the accepted offer or null if no offer accepted
}

interface Offer {
    _id: string;
    user: string; // User ID who sent the offer
    itemsOffered: string[];
    cashOffered: number;
    trade: string; // Trade ID this offer is for
}

const UserProfile = () => {
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDetails = async <T,>(id: string, path: string): Promise<T> => {
            const response = await axios.get<T>(`http://127.0.0.1:8000/${path}/${id}`);
            return response.data;
        };

        const fetchUserData = async () => {
            if (!username) return;
            const userResponse = await axios.get<User>(`http://127.0.0.1:8000/users/${username}`);
            const tradeDetails = await Promise.all(userResponse.data.trades.map(tradeId => fetchDetails<Trade>(tradeId, 'trades')));
            const offerDetails = await Promise.all(userResponse.data.offers.map(offerId => fetchDetails<Offer>(offerId, 'offers')));

            setTrades(tradeDetails);
            setOffers(offerDetails);

        };

        fetchUserData();
    }, [username]);


    return (
        <div>
            <Navbar />
            <h1>User Profile</h1>
            <h2>Username: {username}</h2>
            <div>
                <h3>My Trades</h3>
                <ul>
                    {trades.map((trade, index) => (
                    <li key={index}>
                        <Link to={`/trades/view-trade`}
                            className="trade-link"
                            onClick={() => dispatch(setTradeId(trade._id))}
                        >
                            {trade.title}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>My Offers</h3>
                <ul>
                    {offers.map((offer, index) => (
                        <li key={index}>
                            <Link to={`/trades/view-trade`}
                            className="offer-link"
                            onClick={() => dispatch(setTradeId(offer.trade))}>
                                Offer of: {offer.itemsOffered.join(', ')}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={() => navigate('/change-password')}>Change Password</button>
            <button onClick={() => navigate('/create-trade')}>Create Trade</button>
        </div>
    );
};

export default UserProfile;