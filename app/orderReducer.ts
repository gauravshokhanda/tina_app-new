// orderReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
    name: string;
    price: number;
    image: any;
}

interface Order {
    orderId: string;
    shippingAddress: string;
    items: OrderItem[];
    orderDate: string;
    deliveryDate: string;
}

interface OrderState {
    orders: Order[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
        },
    },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;