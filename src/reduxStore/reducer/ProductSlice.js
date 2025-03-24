import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.in/api/products?limit=150");
  // console.log(response)
  return response.data.products;
});

const initialState = {
    products: [],
    filteredProducts: [],
    status: "idle",
    error: null,
  }
const productSlice = createSlice({
 name: "product",
 initialState,
  reducers: {
    filterProducts: (state, action) => {
      const selectedCategory = action.payload.toLowerCase();
      console.log(selectedCategory);
      state.filteredProducts = state.products.filter(
        (product) => product.category.toLowerCase() === selectedCategory
      );
      console.log( state.filteredProducts);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterProducts } = productSlice.actions;
export default productSlice.reducer;
