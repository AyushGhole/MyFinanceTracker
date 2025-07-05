import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import { toast } from "react-toastify";

export default function TransactionList() {
  const { transactions, editTransaction, deleteTransaction } =
    useTransactions();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    date: "",
    description: "",
  });

  const startEdit = (tx) => {
    setEditingId(tx.id);
    setEditForm({
      amount: tx.amount,
      date: tx.date,
      description: tx.description,
    });
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEdit = (id) => {
    if (!editForm.amount || !editForm.date || !editForm.description) {
      toast.error("All fields are required.");
      return;
    }
    editTransaction(id, { ...editForm, amount: Number(editForm.amount) });
    toast.success("Transaction updated!");
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast.success("Transaction deleted!");
  };

  return (
    <div className="backdrop-blur-md bg-white/1 border border-white/20 p-6 rounded-2xl shadow-xl overflow-x-auto">
      <h2 className="text-2xl font-bold text-[#2f333b] drop-shadow mb-4">
        Transaction List
      </h2>

      {transactions.length === 0 ? (
        <p className="text-[#2f333b] drop-shadow">No transactions yet.</p>
      ) : (
        <table className="min-w-full text-[#2f333b]">
          <thead>
            <tr className="text-left border-b border-white/20">
              <th className="px-4 py-2 font-medium">Amount</th>
              <th className="px-4 py-2 font-medium">Date</th>
              <th className="px-4 py-2 font-medium">Description</th>
              <th className="px-4 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-white/10">
                {editingId === tx.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        name="amount"
                        value={editForm.amount}
                        onChange={handleEditChange}
                        className="w-24 px-2 py-1 rounded bg-white/80 text-black focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        name="date"
                        value={editForm.date}
                        onChange={handleEditChange}
                        className="px-2 py-1 rounded bg-white/80 text-black focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        className="w-48 px-2 py-1 rounded bg-white/80 text-black focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => saveEdit(tx.id)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">₹{tx.amount}</td>
                    <td className="px-4 py-2">{tx.date}</td>
                    <td className="px-4 py-2">{tx.description}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => startEdit(tx)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
