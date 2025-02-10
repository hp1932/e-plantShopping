import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalCartItems: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const {name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }

        state.totalCartItems++;
            console.log("------add totalCartItems "+state.totalCartItems);
    },
    removeItem: (state, action) => {
        console.log("-----actually removing item");
        const {name} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        state.items = state.items.filter(item => item.name !== name);
        console.log("after remove. Item arr len: "+state.items.length);
        if (existingItem) {
            let diff = state.totalCartItems - existingItem.quantity;
            state.totalCartItems = diff >= 0 ? diff : 0;
        }
        console.log("------rem totalCartItems "+state.totalCartItems);

    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            let diff = quantity - existingItem.quantity;
            existingItem.quantity = quantity;
            state.totalCartItems += diff;
            console.log("------ totalCartItems "+state.totalCartItems);
        } 
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
