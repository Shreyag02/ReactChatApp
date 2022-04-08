import { createSlice } from "@reduxjs/toolkit";

import { UserProps } from "../../../utils/types";

export interface StoreState {
  currentUser: UserProps;
  allUsers: UserProps[];
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

  getChatUsersFetch,
  getChatUsersSuccess,
  getChatUsersFailure,

  updateAvatarFetch,
  updateAvatarSuccess,
  updateAvatarFailure,

  deleteAvatarFetch,
  deleteAvatarSuccess,
  deleteAvatarFailure,
} = userSlice.actions;

export default userSlice.reducer;
