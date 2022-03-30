import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LastMessage {
  createdAt: any;
  from: string;
  media: string;
  mediaSnap: string;
  text: string;
  to: string;
  unread: boolean;
}

export interface LastMessageState {
  value: LastMessage;
}

const initialState: LastMessageState = {
  value: {
    createdAt: null,
    from: "",
    media: "",
    mediaSnap: "",
    text: "",
    to: "",
    unread: true,
  },
};

export const lastMsgSlice = createSlice({
  name: "lastMsg",
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

export const {} = lastMsgSlice.actions;

export default lastMsgSlice.reducer;
