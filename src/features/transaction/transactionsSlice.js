import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

//import jsonTransData from "../../assets/data/transactions.json";

//var initialState = jsonTransData;
// const url = `http://localhost:3500/`;
// const initialState = () => {
//   fetch(url + "transactions/byName")
//     .then((resp) => resp.json())
//     .then((resp) => resp);
// };
const url = "http://localhost:3500/";
const initialState = {
  transactions: [],
  // [
  //   {
  //     _id: "6467eb79d8778023245ad7ea",
  //     description: "clark",
  //     amount: { $numberDecimal: "450" },
  //     date: "2023-05-19T00:00:00.000Z",
  //     credit: true,
  //     account: "Main",
  //     active: true,
  //     category: "6467c4488d4c806bd1062b8d",
  //     createdAt: "2023-05-19T21:34:49.157Z",
  //     updatedAt: "2023-05-22T18:32:07.754Z",
  //     __v: 0,
  //     categoryName: "Movies",
  //   },
  //   {
  //     _id: "6467eb80d8778023245ad7ec",
  //     description: "clark2",
  //     amount: { $numberDecimal: "125" },
  //     date: "2023-05-19T00:00:00.000Z",
  //     credit: true,
  //     account: "Main",
  //     active: true,
  //     category: "6467c4648d4c806bd1062b91",
  //     createdAt: "2023-05-19T21:34:56.945Z",
  //     updatedAt: "2023-05-22T18:03:00.261Z",
  //     __v: 0,
  //     categoryName: "Edith Medical",
  //   },
  // ],
  status: "idle",
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await client.get(url + "transactions");
    return response.data;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    transactionsAdded: {
      reducer(state, action) {
        state.transactions.push(action.payload);
      },
      prepare(description, date, amount, categoryName) {
        // omit prepare logic
      },
    },
    transactionUpdated(state, action) {
      const {
        id,
        description,
        amount,
        date,
        credit,
        account,
        active,
        categoryName,
      } = action.payload;
      const existingTransaction = state.transactions.find(
        (transaction) => transaction.id === id
      );
      if (existingTransaction) {
        existingTransaction.description = description;
        existingTransaction.amount = amount;
        existingTransaction.date = date;
        existingTransaction.credit = credit;
        existingTransaction.account = account;
        existingTransaction.active = active;
        existingTransaction.categoryName = categoryName;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched transactions to the array
        state.transactions = state.transactions.concat(action.payload);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// could use the same thing as above to get all transactions that are from the current month... I think

export const { postAdded, postUpdated, reactionAdded } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;

export const selectAllTransactions = (state) => state.transactions.transactions;

export const selectTransactionById = (state, transactionId) =>
  state.transactions.transactions.find(
    (transactions) => transactions._id === transactionId
  );
