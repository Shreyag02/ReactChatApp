import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./reducers/chatReducer";
import lastMsgReducer from "./reducers/lastMsgReducer";
import messageReducer from "./reducers/messageReducer";
import selectedUserReducer from "./reducers/selectedUserReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    lastMsg: lastMsgReducer,
    message: messageReducer,
    selectedUser: selectedUserReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
