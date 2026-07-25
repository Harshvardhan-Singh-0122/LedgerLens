const categories = [
  {
    color: "#8B5CF6",
    name: "Food",
    amount: "₹15,800",
  },
  {
    color: "#A855F7",
    name: "Shopping",
    amount: "₹11,300",
  },
  {
    color: "#C084FC",
    name: "Travel",
    amount: "₹9,200",
  },
  {
    color: "#DDD6FE",
    name: "Bills",
    amount: "₹9,020",
  },
];

const CategoryLegend = () => {
  return (
    <div className="space-y-4 mt-2">
      {categories.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                background: item.color,
              }}
            />

            <span className="text-gray-300">
              {item.name}
            </span>
          </div>

          <span className="text-white font-semibold">
            {item.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryLegend;