// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { BudgetProvider } from "./context/BudgetContext";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TransactionProvider>
      <ThemeProvider>
        <BrowserRouter>
          <BudgetProvider>
            <App />
          </BudgetProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TransactionProvider>
  </React.StrictMode>
);
