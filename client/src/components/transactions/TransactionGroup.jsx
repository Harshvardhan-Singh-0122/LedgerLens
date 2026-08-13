import TransactionItem from "./TransactionItem";

const TransactionGroup = ({ date, items, formatDate }) => {
  const income = items
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = items
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-white font-semibold text-lg">
          {formatDate(date)}
        </h2>

        <div className="flex gap-5">
          <p className="text-green-400 font-semibold">
            ₹{income}
          </p>

          <p className="text-red-400 font-semibold">
            ₹{expense}
          </p>
        </div>
      </div>

      <div className="bg-[#141C28] border border-[#232B3B] rounded-3xl overflow-visible">
        {items.map((transaction, index) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionGroup;