// src/components/MonthlyExpensesChart.jsx

import { useTransactions } from "../context/TransactionContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyExpensesChart() {
  const { transactions } = useTransactions();

  // ✅ Group by month (YYYY-MM)
  const monthlyTotals = transactions.reduce((acc, tx) => {
    const month = tx.date.slice(0, 7);
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/20 p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-[#2f333b] drop-shadow mb-4">
        Monthly Expenses
      </h2>

      {chartData.length === 0 ? (
        <p className="text-[#7c7e82] drop-shadow">No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="month"
              tick={{ fill: "#1e1e4a", fontSize: 12 }}
              axisLine={{ stroke: "#ffffff50" }}
              tickLine={{ stroke: "#ffffff50" }}
            />
            <YAxis
              tick={{ fill: "#1e1e4a", fontSize: 12 }}
              axisLine={{ stroke: "#ffffff50" }}
              tickLine={{ stroke: "#ffffff50" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
                color: "#333",
              }}
            />
            <Bar dataKey="total" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
