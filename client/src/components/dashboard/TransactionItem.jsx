const TransactionItem = ({
  icon,
  title,
  category,
  amount,
  time,
  color,
}) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#1E2635] last:border-none">

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: color }}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-white font-semibold">
            {title}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {category}
          </p>
        </div>
      </div>

      <div className="text-right">
        <h3 className="text-white font-semibold">
          -₹{amount}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {time}
        </p>
      </div>

    </div>
  );
};

export default TransactionItem;