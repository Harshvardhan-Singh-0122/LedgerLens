import { MoreVertical } from "lucide-react";
import CategoryIcon from "./CategoryIcon";

const TransactionItem = ({ transaction, isLast }) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-4 ${
        !isLast ? "border-b border-[#232B3B]" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <CategoryIcon category={transaction.category} />

        <div>
          <h3 className="text-white font-medium">
            {transaction.category}
          </h3>

          <p className="text-sm text-gray-400">
            {new Date(transaction.transactionDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p
          className={`font-semibold ${
            transaction.type === "Income"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {transaction.type === "Income" ? "+" : "-"}₹
          {transaction.amount}
        </p>

        <button className="text-gray-500 hover:text-white">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;