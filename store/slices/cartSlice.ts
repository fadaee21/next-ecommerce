import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TabPanelItem } from "type";
import { getStorage, saveStorage } from "lib/storageFunc";
type Qty = { qty: number };

type CartState = TabPanelItem & Qty;

const initialState: CartState[] = getStorage("shopping-cart") || [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action: PayloadAction<any>) => {
        // console.log(action.payload);
        state.push(action.payload);
        saveStorage("shopping-cart", state);
      },
      prepare: (
        name,
        description,
        id,
        is_sale,
        price,
        sale_price,
        slug,
        qty,
        quantity,
        primary_image,
        primary_image_blurDataURL,
      ) => {
        return {
          payload: {
            name,
            description,
            id,
            is_sale,
            price,
            sale_price,
            slug,
            qty,
            quantity,
            primary_image,
            primary_image_blurDataURL,
          },
        };
      },
    },
    increment: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && state[itemIndex].qty < quantity) {
        state[itemIndex].qty++;
      }

      saveStorage("shopping-cart", state);
    },
    decrement: (state, action: PayloadAction<any>) => {
      const item = state.findIndex((i) => i.id === action.payload.id);
      if (item !== -1 && state[item].qty > 1) {
        state[item].qty--;
      }
      saveStorage("shopping-cart", state);
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const item = state.findIndex((i) => i.id === action.payload.id);
      if (item !== -1) {
        state.splice(item, 1);
      }
      saveStorage("shopping-cart", state);
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addToCart, increment, removeFromCart, decrement, clearCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cartReducer;

export default cartSlice.reducer;
