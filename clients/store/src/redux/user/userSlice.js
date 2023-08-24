import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  country: '',
  note: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
