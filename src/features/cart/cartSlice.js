import { createSelector, createSlice } from '@reduxjs/toolkit'; // 1. create
// initial state

// 1. create initial state
const initialState = {
  cart: [],
};

// 2. create reducer
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (!item) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.pizzaId === id);

      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
  },
});

// 3. export action from reducer
export const {
  addItem,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

// 4. export the reducer
export default cartSlice.reducer;

export const selectCart = (state) => state.cart.cart;

export const getTotalPizza = createSelector([selectCart], (cart) =>
  cart.reduce((acc, item) => acc + item.quantity, 0)
);

export const getTotalPrice = createSelector([selectCart], (cart) =>
  cart.reduce((acc, item) => acc + item.totalPrice, 0)
);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
