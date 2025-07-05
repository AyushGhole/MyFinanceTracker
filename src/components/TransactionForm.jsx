import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { toast } from "react-toastify";
import CategorySelect from "./CategorySelect";
import AnimatedDatePicker from "./AnimatedDatePicker";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();

  const [form, setForm] = useState({
    amount: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState({ name: "🥗 Food" });
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.amount ||
      !selectedDate ||
      !form.description ||
      !selectedCategory
    ) {
      toast.error("All fields are required!");
      return;
    }
    if (Number(form.amount) <= 0) {
      toast.error("Amount must be positive.");
      return;
    }

    addTransaction({
      id: Date.now(),
      amount: Number(form.amount),
      date: selectedDate.toISOString().split("T")[0],
      description: form.description,
      category: selectedCategory.name,
    });

    toast.success("Transaction added!");
    setForm({ amount: "", description: "" });
    setSelectedCategory({ name: "🥗 Food" });
    setSelectedDate(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-[#2f333b] drop-shadow mb-4">
        Add Transaction
      </h2>

      {/* Amount */}
      <div className="mb-4">
        <label className="block text-white mb-1">Amount</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full px-4 py-2 rounded bg-white/80 focus:outline-none"
          required
        />
      </div>

      {/* DatePicker */}
      <div className="mb-4">
        <label className="block text-white mb-1">Date</label>
        <AnimatedDatePicker
          selected={selectedDate}
          setSelected={setSelectedDate}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-white mb-1">Description</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="What is this for?"
          className="w-full px-4 py-2 rounded bg-white/80 focus:outline-none"
          required
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-white mb-1">Category</label>
        <CategorySelect
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition">
        Add Transaction
      </button>
    </form>
  );
}
