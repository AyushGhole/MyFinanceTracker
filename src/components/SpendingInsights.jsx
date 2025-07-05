import { useBudgets } from "../context/BudgetContext";
import { useTransactions } from "../context/TransactionContext";
import { motion } from "framer-motion";

export default function SpendingInsights() {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();

  const spendingByCategory = transactions.reduce((acc, tx) => {
    const category = tx.category || "Other";
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});

  const insights = budgets
    .map((budget) => {
      const spent = spendingByCategory[budget.category] || 0;
      const percent = Math.round((spent / budget.amount) * 100);

      if (percent >= 100) {
        return {
          category: budget.category,
          type: "over",
          percent,
        };
      } else if (percent >= 80) {
        return {
          category: budget.category,
          type: "near",
          percent,
        };
      }
      return null;
    })
    .filter(Boolean);

  if (insights.length === 0) {
    return (
      <p className="text-[#0d2a40] text-center ">
        ✅ You’re on track! No spending alerts right now.
      </p>
    );
  }

  return (
    <div className="space-y-3 text-center">
      {insights.map((insight, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`p-4 rounded-lg ${
            insight.type === "over" ? "bg-red-500/40" : "bg-yellow-400/30"
          } text-white`}>
          {insight.type === "over" ? (
            <p>
              ⚠️ You’re over budget for {insight.category} ({insight.percent}%)
            </p>
          ) : (
            <p>
              🔍 You’ve spent {insight.percent}% of your {insight.category}{" "}
              budget.
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
