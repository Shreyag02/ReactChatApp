import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  avatar: string;
  avatarPath: string;
  createdAt: any;
  email: string;
  isOnline: boolean;
  name: string;
  uid: string | undefined;
}

export interface UserState {
  value: User;
}

const initialState: UserState = {
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

export const userSlice = createSlice({
  name: "User",
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

export const {} = userSlice.actions;

export default userSlice.reducer;
