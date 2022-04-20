import { createSlice } from "@reduxjs/toolkit";

import { MessageValProps, UserProps } from "../../../utils/types";

export interface ChatState {
  selectedChatUser: UserProps | any;
  selectedChatMessages: MessageValProps[];
  lastMsg: {} | any;
  error: any;
  isLoading: boolean;
}

const initialState: ChatState = {
  selectedChatUser: "",
  selectedChatMessages: [],
  lastMsg: null,
  error: null,
  isLoading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectedChatUserFetch: (state, action) => {
      state.isLoading = true;
    },
    selectedChatUserSuccess: (state, action) => {
      state.selectedChatUser = action.payload;
      state.isLoading = false;
    },
    selectedChatUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    selectedChatMessagesFetch: (state, action) => {
      state.isLoading = true;
    },
    selectedChatMessagesSuccess: (state, action) => {
      state.selectedChatMessages = action.payload;
      state.isLoading = false;
    },
    selectedChatMessagesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getUserLastMsgFetch: (state, action) => {
      state.isLoading = true;
    },
    getUserLastMsgSuccess: (state, action) => {
      state.lastMsg = {
        ...state.lastMsg,
        ...action.payload,
      };
      state.isLoading = false;
    },
    getUserLastMsgFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  selectedChatUserFetch,
  selectedChatUserSuccess,
  selectedChatUserFailure,

  selectedChatMessagesFetch,
  selectedChatMessagesSuccess,
  selectedChatMessagesFailure,

  getUserLastMsgFetch,
  getUserLastMsgSuccess,
  getUserLastMsgFailure,
} = chatSlice.actions;

export default chatSlice.reducer;
