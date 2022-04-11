import { createSlice } from "@reduxjs/toolkit";

import { UserProps } from "../../../utils/types";

export interface StoreState {
  authData: any;
  currentUser: UserProps | any;
  allUsers: UserProps[];
  error: any;
  isLoading: boolean;
}

const initialState: StoreState = {
  authData: "",
  currentUser: "",
  allUsers: [],
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

    continueWithGoogleFetch: (state, action) => {
      state.isLoading = true;
    },
    continueWithGoogleSuccess: (state, action) => {
      state.currentUser = { ...action.payload };
      state.isLoading = false;
    },
    continueWithGoogleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    userLogoutFetch: (state, action) => {
      state.isLoading = true;
    },
    userLogoutSuccess: (state, action) => {
      state.currentUser = "";
      state.authData = "";
      state.isLoading = false;
    },
    userLogoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    userAuthSuccess: (state, action) => {
      state.authData = action.payload;
      state.isLoading = false;
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

    updateAvatarFetch: (state, action) => {
      state.isLoading = true;
    },
    updateAvatarSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        avatar: action.payload.avatar,
        avatarPath: action.payload.avatarPath,
      };
      state.isLoading = false;
    },
    updateAvatarFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteAvatarFetch: (state, action) => {
      state.isLoading = true;
    },
    deleteAvatarSuccess: (state, action) => {
      state.currentUser = { ...state.currentUser, avatar: "", avatarPath: "" };
      state.isLoading = false;
    },
    deleteAvatarFailure: (state, action) => {
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

  userLogoutFetch,
  userLogoutSuccess,
  userLogoutFailure,

  userAuthSuccess,

  getChatUsersFetch,
  getChatUsersSuccess,
  getChatUsersFailure,

  updateAvatarFetch,
  updateAvatarSuccess,
  updateAvatarFailure,

  deleteAvatarFetch,
  deleteAvatarSuccess,
  deleteAvatarFailure,

  continueWithGoogleFetch,
  continueWithGoogleSuccess,
  continueWithGoogleFailure,
} = userSlice.actions;

export default userSlice.reducer;
