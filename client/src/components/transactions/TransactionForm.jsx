import { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "sonner";
import { AppRefreshContext } from "../../context/AppRefreshContext";

import {
  addTransaction,
  editTransaction,
} from "../../services/transaction.service";
import {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
} from "../../constants/transaction.constants";

import TransactionFormButtons from "./TransactionFormButtons";

const AddEditTransactionForm = ({ transaction, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "Expense",
    category: "Others",
    merchant: "",
    note: "",
    transactionDate: new Date().toISOString().slice(0, 16),
  });

  const { refreshApp } = useContext(AppRefreshContext);

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        merchant: transaction.merchant,
        note: transaction.note || "",
        transactionDate: new Date(transaction.transactionDate)
          .toISOString()
          .slice(0, 16),
      });
    }
  }, [transaction]);

const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: name === "amount"
      ? Number(value)
      : value,
  });

};

  const handleSubmit = async () => {
    try {
      if (transaction) {
        await editTransaction(transaction._id, formData);
      } else {
        await addTransaction(formData);
      }

      toast.success(
        transaction
          ? "Transaction updated successfully."
          : "Transaction added successfully.",
      );

      refreshApp();

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold text-white mb-6">
        {transaction ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <div className="space-y-4">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#232B3B] rounded-xl p-3 text-white"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#232B3B] rounded-xl p-3 text-white"
        >
          {TRANSACTION_TYPES.filter((type) => type !== "All").map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#232B3B] rounded-xl p-3 text-white"
        >
          {TRANSACTION_CATEGORIES.filter(
            (category) => category !== "Income",
          ).map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <input
          name="merchant"
          placeholder="Merchant"
          value={formData.merchant}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#232B3B] rounded-xl p-3 text-white"
        />

        <input
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#232B3B] rounded-xl p-3 text-white"
        />

        <input
          name="transactionDate"
          type="datetime-local"
          value={formData.transactionDate}
          onChange={handleChange}
          className="w-full bg-[#0B1120] border border-[#232B3B] rounded-xl p-3 text-white"
        />
      </div>

      <TransactionFormButtons
        transaction={transaction}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddEditTransactionForm;
