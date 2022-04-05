import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../services/firebase";
import { handleError } from "../../../utils/helper";

import { LastMsg, MessageValProps, UserProps } from "../../../utils/types";

export interface StoreState {
  currentUser: UserProps;
  // selectedChatUser: UserProps;
  allUsers: UserProps[];
  // selectedChatMessages: MessageValProps[];
  // lastMsg: LastMsg;
  error: any;
  isLoading: boolean;
}

const initialState: StoreState = {
  currentUser: {
    avatar: "",
    avatarPath: "",
    createdAt: null,
    email: "",
    isOnline: false,
    name: "",
    uid: "",
  },
  // selectedChatUser: {
  //   avatar: "",
  //   avatarPath: "",
  //   createdAt: null,
  //   email: "",
  //   isOnline: false,
  //   name: "",
  //   uid: "",
  // },
  allUsers: [],
  // selectedChatMessages: [],
  // lastMsg: {
  //   createdAt: null,
  //   from: "",
  //   media: "",
  //   mediaSnap: "",
  //   text: "",
  //   to: "",
  //   unread: true,
  // },
  error: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    emailSignUpFetch: (state, action) => {
      state.isLoading = true;
    },
    emailSignUpSuccess: (state, action) => {
      state.currentUser = { ...action.payload };
      state.isLoading = false;
    },
    emailSignUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    emailLogInFetch: (state, action) => {
      state.isLoading = true;
    },
    emailLogInSuccess: (state, action) => {
      state.currentUser = { ...action.payload };
      state.isLoading = false;
    },
    emailLogInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getChatUsersFetch: (state, action) => {
      state.isLoading = true;
    },
    getChatUsersSuccess: (state, action) => {
      state.allUsers = action.payload;
      state.isLoading = false;
    },
    getChatUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  emailSignUpFetch,
  emailSignUpSuccess,
  emailSignUpFailure,
  emailLogInFetch,
  emailLogInSuccess,
  emailLogInFailure,
  getChatUsersFailure,
  getChatUsersFetch,
  getChatUsersSuccess,
} = userSlice.actions;

// export interface SignupStateState {
//   currentUser: UserProps;
//   error: any;
//   isLoading: boolean;
// }

// const initialState: SignupStateState = {
//   currentUser: {
//     avatar: "",
//     avatarPath: "",
//     createdAt: null,
//     email: "",
//     isOnline: false,
//     name: "",
//     uid: "",
//   },
//   isLoading: false,
//   error: null,
// };

// export const signUpSlice = createSlice({
//   name: "signUp",
//   initialState,
//   reducers: {
//     emailSignUpFetch: (state, action) => {
//       state.isLoading = true;
//     },
//     emailSignUpSuccess: (state, action) => {
//       state.currentUser = { ...action.payload };
//       state.isLoading = false;
//     },
//     emailSignUpFailure: (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

export default userSlice.reducer;
