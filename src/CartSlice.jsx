// src/CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store cart items: { name, image, cost, quantity }
  },
  reducers: {
    // Reducer to add a new item to the cart or increment its quantity if it already exists
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.name === action.payload.name
      );
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.items.push(action.payload); // Add new item to cart
      }
    },
    // Reducer to remove an item from the cart based on its name
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },
    // Reducer to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
        // Optionally, remove the item if quantity becomes 0
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.name !== name);
        }
      }
    },
  },
});

// Export the action creators to be used in ProductList.jsx and CartItem.jsx
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export the reducer as the default to be used in store.js
export default cartSlice.reducer;