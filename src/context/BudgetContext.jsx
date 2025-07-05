import { createContext, useState, useContext } from "react";

const BudgetContext = createContext();

export const useBudgets = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);

  const setBudget = (category, amount) => {
    setBudgets((prev) => {
      const existing = prev.find((b) => b.category === category);
      if (existing) {
        return prev.map((b) =>
          b.category === category ? { ...b, amount } : b
        );
      } else {
        return [...prev, { category, amount }];
      }
    });
  };

  return (
    <BudgetContext.Provider value={{ budgets, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
