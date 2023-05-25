import { transactionUpdated, selectTransactionById } from "./transactionsSlice";

export const EditTransactionForm = ({ match }) => {
  const { transactionId } = match.params;

  const transaction = useSelector((state) =>
    selectTransactionById(state, transactionId)
  );
  // omit component logic
};
