import { useState } from "react";
import { useBudgets } from "../context/BudgetContext";

const categories = [
  "🥗 Food",
  "🚗 Transport",
  "🏠 Housing",
  "🎉 Entertainment",
  "📚 Education",
  "🛍️ Shopping",
  "💊 Health",
  "🧾 Other",
];

export default function BudgetForm() {
  const { setBudget } = useBudgets();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) return;
    setBudget(category, Number(amount));
    setCategory("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-[#2f333b] drop-shadow">
        Set Monthly Budget
      </h2>
      <div>
        <label className="text-white block mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white/80">
          <option value="">Select</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-white block mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 rounded bg-white/80"
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded shadow">
        Save Budget
      </button>
    </form>
  );
}
