import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TradeState {
  currentTradeId: string | null;
}

const initialState: TradeState = {
  currentTradeId: null,
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setTradeId: (state, action: PayloadAction<string | null>) => {
      state.currentTradeId = action.payload;
    },
    clearTradeId: (state) => {
      state.currentTradeId = null;
    },
  },
});

export const { setTradeId, clearTradeId } = tradeSlice.actions;
export default tradeSlice.reducer;