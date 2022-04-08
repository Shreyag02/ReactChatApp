import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";
// import lastMsgReducer from "./lastMsgReducer";
import messageReducer from "./messageReducer";
// import selectedUserReducer from "./selectedUserReducer";
// import signUpReducer from "./signUpReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  chat: chatReducer,
  // lastMsg: lastMsgReducer,
  message: messageReducer,
  // selectedUser: selectedUserReducer,
  user: userReducer,
  // signUp: signUpReducer,
  // profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
