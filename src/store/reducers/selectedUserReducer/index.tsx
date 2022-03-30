import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedUser {
  avatar: string;
  avatarPath: string;
  createdAt: any;
  email: string;
  isOnline: boolean;
  name: string;
  uid: string | undefined;
}

export interface SelectedUserState {
  value: SelectedUser;
}

const initialState: SelectedUserState = {
  value: {
    avatar: "",
    avatarPath: "",
    createdAt: null,
    email: "",
    isOnline: false,
    name: "",
    uid: "",
  },
};

export const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    //   addCustomer: (state, action: PayloadAction<Customer>) => {
    //     state.value.push(action.payload);
    //   },
    //   addFoodToCustomer: (
    //     state,
    //     action: PayloadAction<AddFoodToCustomerPayload>
    //   ) => {
    //     state.value.forEach((customer) => {
    //       if (customer.id === action.payload.id) {
    //         customer.food.push(action.payload.food);
    //       }
    //     });
    //   },
  },
});

export const {} = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
