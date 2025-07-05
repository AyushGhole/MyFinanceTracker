import { useBudgets } from "../context/BudgetContext";
import { useTransactions } from "../context/TransactionContext";
import { motion } from "framer-motion";

export default function BudgetVsActual() {
  const { budgets } = useBudgets();
  const { transactions } = useTransactions();

  // Calculate spending per category
  const spendingByCategory = transactions.reduce((acc, tx) => {
    const category = tx.category || "Other";
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-xl font-bold text-[#2f333b] drop-shadow mb-4">
        Budget vs Actual Spending
      </h2>

      {budgets.length === 0 ? (
        <p className="text-white">No budgets set yet.</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget, index) => {
            const spent = spendingByCategory[budget.category] || 0;
            const percent = Math.min((spent / budget.amount) * 100, 100);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}>
                <div className="flex justify-between mb-1">
                  <span className="text-white font-medium">
                    {budget.category}
                  </span>
                  <span className="text-white">
                    ₹{spent} / ₹{budget.amount}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${
                      percent >= 100 ? "bg-red-500" : "bg-green-400"
                    } transition-all duration-500`}
                    style={{ width: `${percent}%` }}></div>
                </div>
                {percent >= 100 && (
                  <p className="text-red-200 text-sm mt-1">⚠️ Over budget!</p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
