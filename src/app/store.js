import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../features/transaction/transactionsSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    categories: categoryReducer,
  },
});
