import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    initialState: [],
    name: "cart",
    reducers: {
        add(state, action) {
            const tempState = state.filter(
                (product) => product.id === action.payload.id
            );
            if (tempState.length < 1) {
                state.push(action.payload);
            }
        },
        remove(state, action) {
            return state.filter((product) => product.id !== action.payload.id);
        },
        increase(state, action) {
            const tempState = state.map((product) => {
                if (product.id === action.payload.id) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
            return tempState;
        },
        decrease(state, action) {
            const tempState = state.map((product) => {
                if (product.id === action.payload.id) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
            return tempState;
        },
        clear(state, action) {
            return [];
        },
    },
});
export default cartSlice;
