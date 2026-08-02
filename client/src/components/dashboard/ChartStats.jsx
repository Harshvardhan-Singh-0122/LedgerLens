import { formatCurrency } from "../../utils/formatCurrency";
const ChartStats = ({ stats }) => {
  console.log("Stats in ChartStats:", stats);
  
  const highestDay = stats?.highestDay ?? 0;
  const highestDayLabel = stats?.highestDayLabel ?? "--";

  const averageDaily = stats?.averageDaily ?? 0;

  const lowestDay = stats?.lowestDay ?? 0;
  const lowestDayLabel = stats?.lowestDayLabel ?? "--";
  
  return (
    <div className="grid grid-cols-3 gap-3 mt-5">

      <div className="bg-[#0F1622] rounded-2xl p-3 border border-[#222B38]">
        <p className="text-gray-400 text-[11px]">
          Highest Day
        </p>

        <h3 className="text-white text-[15px] font-bold mt-1">
          {formatCurrency(highestDay)}
        </h3>

        <p className="text-green-400 text-[11px] mt-1">
           {highestDayLabel}
        </p>
      </div>

      <div className="bg-[#0F1622] rounded-2xl p-3 border border-[#222B38]">
        <p className="text-gray-400 text-[10px]">
          Average Daily 
        </p>

        <h3 className="text-white text-[15px] font-bold mt-1">
          {formatCurrency(averageDaily)}
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
          {formatCurrency(lowestDay)}
        </h3>

        <p className="text-red-400 text-[10px] mt-1">
          {lowestDayLabel}
        </p>
      </div>

    </div>
  );
};

export default ChartStats;