// src/context/TransactionContext.jsx

import { createContext, useState, useContext } from "react";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const editTransaction = (id, updated) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
