import { createSlice } from "@reduxjs/toolkit";
import jsonCatData from "../../assets/data/categories.json";

const initialState = jsonCatData;

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export const selectAllCategories = (state) => state.categories;

export default categorySlice.reducer;
