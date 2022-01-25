import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  user: {
    name: string;
    photoUrl: string;
    phoneNumber: string;
    uid: string;
  };
  auth: {
    isNewUser: boolean;
  };
}

const initialState: IUserState = {
  user: {
    name: '',
    photoUrl: '',
    phoneNumber: '',
    uid: '',
  },
  auth: {
    isNewUser: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state = action.payload;
    },
    setDefaultUser: (state) => {
      state = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setDefaultUser } = userSlice.actions;

export default userSlice.reducer;
