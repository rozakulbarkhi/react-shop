import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../actions/products";

const initialState = {
  products: [],
  loading: false,
  error: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productsSlice.reducer;
