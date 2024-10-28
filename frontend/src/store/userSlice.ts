import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  userId: string | null;
}

interface UserPayload {
  username: string;
  userId: string;
}

const initialState: UserState = {
  username: null,
  userId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayload>) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    clearUser: (state) => {
      state.username = null;
      state.userId = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;