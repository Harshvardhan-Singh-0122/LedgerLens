const SummaryCard = ({ icon, iconBg, title, amount, change, changeColor }) => {
  return (
    <div
      className="
        bg-[#131A27]
        border
        border-[#252E3D]
        rounded-2xl
        p-2
        h-[110px]
        flex
        flex-col
      "
    >
      <div className="flex items-center justify-between">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: iconBg }}
        >
          {icon}
        </div>

        <span className="text-gray-500 font-bold">•••</span>
      </div>

      <p className="text-gray-300 text-[10px] mt-1">{title}</p>

      <h2 className="text-white text-[15px] font-bold mt-1">{amount}</h2>

      {change && (
        <p className={`text-[8px] mt-auto ${changeColor}`}>{change}</p>
      )}
    </div>
  );
};

export default SummaryCard;
