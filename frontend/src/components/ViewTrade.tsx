import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import axios from "axios";
import Navbar from "./NavBar";

interface User {
    _id: string;
    username: string;
}

interface Trade {
    _id: string;
    userId: string; // User ID who created the trade
    title: string;
    description: string;
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

const ViewTrade = () => {
    const username = useSelector((state: RootState) => state.user.username);
    const userId = useSelector((state: RootState) => state.user.userId);
    const currentTradeId = useSelector((state: RootState) => state.trade.currentTradeId);
    const [currentTrade, setCurrentTrade] = useState<Trade | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [itemsOffered, setItemsOffered] = useState<string[]>([]);
    const [cashOffered, sentCashOffered] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [tradePoster, setTradePoster] = useState<string | null>(null);
    const [acceptedUsername, setAcceptedUsername] = useState('');
    const [tradeOpen, setTradeOpen] = useState(true);

    useEffect(() => {
        const fetchDetails = async <T,>(id: string, path: string): Promise<T> => {
            const response = await axios.get<T>(`http://127.0.0.1:8000/${path}/${id}`);
            return response.data;
        };

        const fetchTradeData = async () => {
            const tradeResponse = await axios.get<Trade>(`http://127.0.0.1:8000/trades/${currentTradeId}`);
            setCurrentTrade(tradeResponse.data);
            const tradeMaker = await axios.get<User>(`http://127.0.0.1:8000/users/userId/${tradeResponse.data.userId}`);
            setTradePoster(tradeMaker.data.username);
            const offerDetails = await Promise.all(tradeResponse.data.offers.map(offerId => fetchDetails<Offer>(offerId, 'offers')));
            setOffers(offerDetails);
            const trade_status = currentTrade?.acceptedOffer === undefined;
            setTradeOpen(trade_status);
        };

        const getAcceptedUsername = async (offerId: string | null | undefined) => {
            if (!offerId) {
                setAcceptedUsername("No accepted offer.");
                return;
            }
        
            try {
                const response = await axios.get(`http://127.0.0.1:8000/offers/${offerId}`);
                setAcceptedUsername(response.data.user.username);
            } catch (error) {
                console.error("Error getting accepted offer:", error);
                setAcceptedUsername("Failed to fetch offer details.");
            }
        };

        if (currentTrade?.acceptedOffer) {
            getAcceptedUsername(currentTrade.acceptedOffer);
        }

        fetchTradeData();
    }, [username, currentTradeId, currentTrade?.acceptedOffer]);

    const handleMakeOffer = async (itemsOffered: string[], cashOffered: number) => {

        if(!itemsOffered || itemsOffered.length === 0) {
            setError("Please enter at least one item.");
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/trades/offers`, {
                tradeId: currentTradeId,
                userId,
                itemsOffered,
                cashOffered
            });
            if (response) {
                setError(null);
                console.log("Offer posted successfully.")
                setMessage("Offer posted successfully.");
            }
        } catch (error) {
            setError("Error submitting offer. Please try again.");
            console.error("Error submitting offer:", error);
        }
    }

    const handleAcceptOffer = async (offerId: string) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/trades/accept-offer/`, {
                tradeId: currentTradeId,
                offerId
            });
            setMessage("Offer accepted successfully.");
        } catch (error) {
            setError("Error accepting offer. Please try again.");
            console.error("Error accepting offer:", error);            
        }
    };

    const makeArray = (itemsOffered: string) => {
        return itemsOffered.split(',');
    }

    const getUsername = (user: string) => {
        const user_json = JSON.parse(JSON.stringify(user));
        return (user_json.username);
    }

    const differentUser = userId !== currentTrade?.userId?? '';

    return (
        <div>
            <Navbar />
            <h1>Trade</h1>
            <h2>Title: {currentTrade?.title}</h2>
            <h2>From: {tradePoster}</h2>
            <h3>Description: {currentTrade?.description}</h3>
            <div>
            {message && <h4 className="success-message">{message}</h4>}
            {error && <h4 className="error-message">{error}</h4>}
            {!tradeOpen ? (
                <>
                    <h4> Trade is closed.</h4>
                    <h3> Accepted trade {`offer from ${acceptedUsername}.`}</h3>
                </>
            ) : (
                <>
                {differentUser ? (
                    <>
                    <div>
                        <input
                            type="text"
                            id="itemsOffered"
                            placeholder="Items Offered (comma separated)"
                            value={itemsOffered}
                            onChange={(e) => setItemsOffered(makeArray(e.target.value))}
                        />
                        <input
                            type="number"
                            id="cashOffered"
                            placeholder="Cash Offered"
                            value={cashOffered}
                            onChange={(e) => sentCashOffered(parseFloat(e.target.value) || 0)}
                            min="0"
                            step="1"
                        />
                        <button onClick={() => {handleMakeOffer(itemsOffered, cashOffered)}}>Make Offer</button>
                        </div>
                        <div>
                        <h3>Offers</h3>
                            <ul>
                                {offers.map((offer, index) => (
                                    <li key={index}>
                                    <div>{`Offer from ${getUsername(offer.user)}`}</div>
                                    <div>{`Items offered: ${offer.itemsOffered.join(', ')}`}</div>
                                    <div>{`For PKR ${offer.cashOffered}`}</div>
                                    </li>
                                ))}
                            </ul>
                            </div>
                    </>
                    ) : (
                        <>
                        <h4>You can accept one of the following trades.</h4>
                        <div>
                            <h3>Offers</h3>
                            <ul>
                                {offers.map((offer, index) => (
                                    <li key={index}>
                                    <div>{`Offer from ${getUsername(offer.user)}`}</div>
                                    <div>{`Items offered: ${offer.itemsOffered.join(', ')}`}</div>
                                    <div>{`For PKR ${offer.cashOffered}`}</div>
                                    <button onClick={() => {handleAcceptOffer(offer._id)}}>Accept Offer</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        </>
                    )}
                </>
            )}
            </div>
        </div>
    )
};

export default ViewTrade;