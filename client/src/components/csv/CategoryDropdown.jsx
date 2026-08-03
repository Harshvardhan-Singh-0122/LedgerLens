import { TRANSACTION_CATEGORIES } from "../../constants/transaction.constants";

const CategoryDropdown = ({
  transaction,
  onCategoryChange,
}) => {
  return (
    <select
      value={transaction.category}
      onChange={(e) =>
        onCategoryChange(
          transaction.transactionId,
          e.target.value
        )
      }
      className="
        w-full
        bg-[#141C28]
        border
        border-[#232B3B]
        rounded-xl
        px-3
        py-2
        text-white
        outline-none
      "
    >
      {TRANSACTION_CATEGORIES.map((category) => (
        <option
          key={category}
          value={category}
          className="bg-[#141C28]"
        >
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;