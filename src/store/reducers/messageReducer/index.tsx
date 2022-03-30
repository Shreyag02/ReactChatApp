import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  createdAt: any;
  from: string;
  media: string;
  mediaSnap: string;
  text: string;
  to: string;
}

export interface MessageState {
  value: Message;
}

const initialState: MessageState = {
  value: {
    createdAt: null,
    from: "",
    media: "",
    mediaSnap: "",
    text: "",
    to: "",
  },
};

export const messageSlice = createSlice({
  name: "message",
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

export const {} = messageSlice.actions;

export default messageSlice.reducer;
