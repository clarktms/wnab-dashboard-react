import { createSlice } from "@reduxjs/toolkit";
import jsonTransData from "../../assets/data/transactions.json";

const initialState = jsonTransData;

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
});

export const selectAllTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;
