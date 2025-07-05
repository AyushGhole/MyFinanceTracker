import { useTransactions } from "../context/TransactionContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#8B5CF6", // Violet
  "#F43F5E", // Rose
  "#14B8A6", // Teal
];

export default function CategoryPieChart() {
  const { transactions } = useTransactions();

  // Group transactions by category
  const categoryTotals = transactions.reduce((acc, tx) => {
    const category = tx.category || "Other";
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  return (
    <div className="backdrop-blur-md bg-white/30 border border-white/20 p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-[#2f333b] drop-shadow mb-4">
        Expenses by Category
      </h2>

      {data.length === 0 ? (
        <p className="text-[#7c7e82]">No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
