import { Spinner } from "react-bootstrap";
import { selectAllTransactions, fetchTransactions } from "./transactionsSlice";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// reactstrap components
import { Table } from "reactstrap";
import { decodedTextSpanIntersectsWith } from "typescript";

const TransactionsTableList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);

  const transactionStatus = useSelector((state) => state.transactions.status);
  const error = useSelector((state) => state.transactions.error);

  let content;

  if (transactionStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedTransactions = transactions
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
  } else if (transactions === "failed") {
    content = <div>{error}</div>;
  }

  useEffect(() => {
    if (transactionStatus === "idle") {
      dispatch(fetchTransactions());
    }
  }, [transactionStatus, dispatch]);

  const renderedTransactions = transactions.map((transactions) => (
    <tr key={transactions._id}>
      <td>{transactions.description.substring(0, 60)}</td>
      <td>{transactions.date}</td>
      <td>{"$" + transactions.amount.$numberDecimal}</td>
      <td>{transactions.categoryName}</td>
    </tr>
  ));

  return (
    <Table className="tablesorter" responsive>
      <thead className="text-primary">
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Category Name</th>
        </tr>
      </thead>
      <tbody>{renderedTransactions}</tbody>
    </Table>
  );
};

export default TransactionsTableList;
