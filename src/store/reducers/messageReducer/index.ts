import { createSlice } from "@reduxjs/toolkit";

export interface MsgState {
  error: any;
  isLoading: boolean;
}

const initialState: MsgState = {
  error: null,
  isLoading: false,
};

export const msgSlice = createSlice({
  name: "msg",
  initialState,
  reducers: {
    addNewMessageFetch: (state, action) => {
      state.isLoading = true;
    },
    addNewMessageSuccess: (state, action) => {
      state.isLoading = false;
    },
    addNewMessageFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    readStatusFetch: (state, action) => {
      state.isLoading = true;
    },
    readStatusSuccess: (state, action) => {
      state.isLoading = false;
    },
    readStatusFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addNewMessageFetch,
  addNewMessageSuccess,
  addNewMessageFailure,

  readStatusFetch,
  readStatusSuccess,
  readStatusFailure,
} = msgSlice.actions;

export default msgSlice.reducer;
