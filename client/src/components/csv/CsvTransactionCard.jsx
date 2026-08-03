import CategoryDropdown from "./CategoryDropdown";

const CsvTransactionCard = ({
  transaction,
  onCategoryChange,
}) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-4
        ${
          transaction.isDuplicate
            ? "border-red-500/40 bg-red-500/5"
            : "border-[#232B3B] bg-[#0B1120]"
        }
      `}
    >
      {/* Top */}
      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-white font-semibold">
            {transaction.merchant}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            ₹ {transaction.amount}
          </p>

        </div>

        {transaction.isDuplicate && (
          <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
            Duplicate
          </span>
        )}

      </div>

      {/* Date */}
      <p className="text-gray-500 text-xs mt-2">
        {new Date(transaction.transactionDate).toLocaleString()}
      </p>

      {/* Category */}
      <div className="mt-4">

        <p className="text-gray-400 text-xs mb-1">
          Category
        </p>

        <CategoryDropdown
            transaction={transaction}
            onCategoryChange={onCategoryChange}
        />

      </div>

      {/* Note */}
      {transaction.note && (
        <div className="mt-4">

          <p className="text-gray-400 text-xs">
            Note
          </p>

          <p className="text-white text-sm mt-1">
            {transaction.note}
          </p>

        </div>
      )}

    </div>
  );
};

export default CsvTransactionCard;