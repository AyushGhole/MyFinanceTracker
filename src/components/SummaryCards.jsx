import { useTransactions } from "../context/TransactionContext";
import { motion } from "framer-motion";

export default function SummaryCards() {
  const { transactions } = useTransactions();

  const totalExpenses = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const totalTransactions = transactions.length;

  const categoryTotals = transactions.reduce((acc, tx) => {
    const category = tx.category || "Other";
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});
  const biggestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const mostRecent = transactions.sort((a, b) => b.id - a.id)[0];

  const cardData = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses}`,
    },
    {
      title: "Transactions",
      value: totalTransactions,
    },
    {
      title: "Biggest Category",
      value: biggestCategory
        ? `${biggestCategory[0]}: ₹${biggestCategory[1]}`
        : "N/A",
    },
    {
      title: "Most Recent",
      value: mostRecent
        ? `${mostRecent.description} (₹${mostRecent.amount})`
        : "N/A",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="backdrop-blur-md bg-white/30 border border-white/20 p-4 rounded-xl shadow flex flex-col justify-between">
          <h3 className="text-[#2f333b] font-medium mb-2">{card.title}</h3>
          <p className="text-2xl font-bold text-[#888a8f]">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
