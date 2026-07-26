const getCategoryIcon = (category) => {
  switch (category) {
    case "Food & Dining":
      return "🍔";

    case "Shopping":
      return "🛍️";

    case "Bills":
      return "💡";

    case "Travel":
      return "🚗";

    case "Entertainment":
      return "🎬";

    case "Healthcare":
      return "🏥";

    case "Education":
      return "📚";

    case "Salary":
      return "💰";

    default:
      return "💳";
  }
};

const CategoryIcon = ({ category }) => {
  return (
    <div className="w-11 h-11 rounded-full bg-[#202A38] flex items-center justify-center text-lg">
      {getCategoryIcon(category)}
    </div>
  );
};

export default CategoryIcon;