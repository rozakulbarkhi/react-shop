import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../actions/product";

const initialState = {
  product: {},
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productSlice.reducer;
