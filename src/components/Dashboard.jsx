import GlassCard from "./GlassCard";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import MonthlyExpensesChart from "./MonthlyExpensesChart";
import { motion } from "framer-motion";
import CategoryPieChart from "./CategoryPieChart";
import SummaryCards from "./SummaryCards";
import BudgetForm from "./BudgetForm";
import BudgetVsActual from "./BudgetVsActual";
import SpendingInsights from "./SpendingInsights";

export default function Dashboard() {
  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-8">
      {/* ✅ Header with motion */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#13171f] drop-shadow">
          💰 My Finance Tracker
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-white font-medium drop-shadow">👋 Hello!</span>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow hover:shadow-lg transition">
            Log Out
          </button>
        </div>
      </motion.header>

      {/* ✅ Summary Cards */}
      <GlassCard delay={0.1} className="mb-8">
        <SummaryCards />
      </GlassCard>

      {/* ✅ Main Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard delay={0.2}>
          <TransactionForm />
        </GlassCard>

        <GlassCard delay={0.3}>
          <MonthlyExpensesChart />
          <div className="mt-6">
            <CategoryPieChart />
          </div>
        </GlassCard>

        <GlassCard delay={0.35} className="md:col-span-1.5">
          <BudgetForm />
        </GlassCard>

        <GlassCard delay={0.4}>
          <BudgetVsActual />
        </GlassCard>

        <GlassCard delay={0.45} className="md:col-span-2">
          <SpendingInsights />
        </GlassCard>

        <GlassCard delay={0.4} className="md:col-span-2">
          <TransactionList />
        </GlassCard>
      </div>
    </div>
  );
}
