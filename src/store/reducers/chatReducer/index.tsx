import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  createdAt: any;
  from: string;
  media: string;
  mediaSnap: string;
  text: string;
  to: string;
}

// interface AddFoodToCustomerPayload {
//   food: string;
//   id: string;
// }

export interface ChatState {
  value: Message[];
}

const initialState: ChatState = {
  value: [],
};

export const chatSlice = createSlice({
  name: "chat",
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

export const {} = chatSlice.actions;

export default chatSlice.reducer;
