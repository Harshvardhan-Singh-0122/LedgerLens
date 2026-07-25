const ChartStats = () => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-5">

      <div className="bg-[#0F1622] rounded-2xl p-3 border border-[#222B38]">
        <p className="text-gray-400 text-[11px]">
          Highest Day
        </p>

        <h3 className="text-white text-[15px] font-bold mt-1">
          ₹18.2k
        </h3>

        <p className="text-green-400 text-[11px] mt-1">
          30 Jul
        </p>
      </div>

      <div className="bg-[#0F1622] rounded-2xl p-3 border border-[#222B38]">
        <p className="text-gray-400 text-[10px]">
          Avg Daily
        </p>

        <h3 className="text-white text-[15px] font-bold mt-1">
          ₹8.9k
        </h3>

        <p className="text-violet-400 text-[10px] mt-1">
          This Month
        </p>
      </div>

      <div className="bg-[#0F1622] rounded-2xl p-3 border border-[#222B38]">
        <p className="text-gray-400 text-[10px]">
          Lowest Day
        </p>

        <h3 className="text-white text-[15px] font-bold mt-1">
          ₹2.0k
        </h3>

        <p className="text-red-400 text-[10px] mt-1">
          1 Jul
        </p>
      </div>

    </div>
  );
};

export default ChartStats;