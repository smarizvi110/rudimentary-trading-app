import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTradeId } from '../store/tradeSlice';
import Navbar from './NavBar';

interface Trade {
  _id: string;
  title: string;
  description: string;
}

const BrowseTrades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOpenTrades = async () => {
      try {
        const { data } = await axios.get<Trade[]>('http://127.0.0.1:8000/trades/open');
        setTrades(data);
        setFilteredTrades(data); // Initialize filtered trades with all trades
      } catch (error) {
        console.error('Failed to fetch open trades:', error);
      }
    };

    fetchOpenTrades();
  }, []);

  useEffect(() => {
    const filtered = trades.filter(trade =>
      trade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrades(filtered);
  }, [searchTerm, trades]);

  const handleSelectTrade = (tradeId: string) => {
    dispatch(setTradeId(tradeId));
    navigate(`/trades/view-trade`);
  };

  return (
    <div>
        <Navbar />
      <h1>Open Trades</h1>
      <input
        type="text"
        placeholder="Search trades..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredTrades.map(trade => (
        <div key={trade._id}>
          <h3>{trade.title}</h3>
          <p>{trade.description}</p>
          <button onClick={() => handleSelectTrade(trade._id)}>View Trade</button>
        </div>
      ))}
    </div>
  );
};

export default BrowseTrades;
