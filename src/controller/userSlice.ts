import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  user: {
    name: string;
    photoUri: string;
    uid: string;
  };
  auth: {
    isNewUser: boolean;
  };
}

const initialState: IUserState = {
  user: {
    name: '',
    photoUri: '',
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
    setCurrentUser: (state, action: PayloadAction<IUserState['user']>) => {
      state.user = action.payload;
    },
    setDefaultUser: (state) => {
      state.user = initialState.user;
      state.auth = initialState.auth;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setDefaultUser } = userSlice.actions;

export default userSlice.reducer;
