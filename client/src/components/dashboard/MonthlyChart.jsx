// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import { ChevronDown } from "lucide-react";
// import ChartStats from "./ChartStats";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload) return null;

//   return (
//     <div className="bg-violet-600 rounded-xl px-4 py-2 shadow-xl">
//       <p className="text-white text-xs">{label}</p>

//       <p className="text-white font-semibold mt-1">
//         ₹{payload[0].value.toLocaleString("en-IN")}
//       </p>
//     </div>
//   );
// };

// const MonthlyChart = ({ monthlyTrend = [], monthlyStats }) => {
//   const data = monthlyTrend.map((item) => ({
//     day: new Date(item._id.year, item._id.month - 1).toLocaleString("en-US", {
//       month: "short",
//     }),

//     amount: item.totalExpense,
//   }));
//   return (
//     // <div className="mt-5 mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">
//     <div className="mt-5 mx-4 md:mx-6 lg:mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">
//       <div className="flex items-center justify-between">
//         <h2 className="text-white text-[12px] font-semibold">
//           Monthly Spending Overview
//         </h2>

//         <button className="flex items-center gap-1 border border-[#2A3344] rounded-lg px-2.5 py-1 text-[10px] text-white">
//           This Month
//           <ChevronDown size={10} />
//         </button>
//       </div>

//       {/* <div className="h-[250px] mt-5"> */}
//       <div className="h-[250px] md:h-[300px] lg:h-[340px] mt-5">
//         <ResponsiveContainer>
//           <AreaChart
//             data={data}
//             margin={{
//               top: 10,
//               right: 10,
//               left: -20,
//               bottom: 0,
//             }}
//           >
//             <defs>
//               <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.45} />

//                 <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid vertical={false} stroke="#202938" />

//             <XAxis
//               dataKey="day"
//               tick={{
//                 fill: "#8A93A5",
//                 fontSize: 9,
//               }}
//               tickLine={false}
//               axisLine={false}
//             />

//             <YAxis
//               domain={["auto", "auto"]}
//               tickFormatter={(v) => (v === 0 ? "₹0" : `₹${v / 1000}k`)}
//               tick={{
//                 fill: "#8A93A5",
//                 fontSize: 9,
//               }}
//               tickLine={false}
//               axisLine={false}
//             />

//             <Tooltip content={<CustomTooltip />} />

//             <Area
//               type="monotone"
//               dataKey="amount"
//               stroke="#8B5CF6"
//               strokeWidth={3}
//               fill="url(#fill)"
//               activeDot={{
//                 r: 6,
//                 fill: "#8B5CF6",
//                 stroke: "#fff",
//                 strokeWidth: 2,
//               }}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       <ChartStats stats={monthlyStats} />
//     </div>
//   );
// };

// export default MonthlyChart;

//-----------------For updating the dashboard from Month wise button----------------
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartStats from "./ChartStats";
import MonthSelector from "./MonthSelector";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-violet-600 rounded-xl px-4 py-2 shadow-xl">
      <p className="text-white text-xs">
        Day {label}
      </p>

      <p className="text-white font-semibold mt-1">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const MonthlyChart = ({
  monthlyTrend = [],
  monthlyStats,
  loading,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}) => {

  const data = monthlyTrend.map((item) => ({
    day: item._id.day,
    amount: item.totalExpense,
  }));


  return (
    <div className="mt-5 mx-4 md:mx-6 lg:mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">

      <div className="flex items-center justify-between">

        <h2 className="text-white text-[12px] font-semibold">
          Monthly Spending Overview
        </h2>

        <div className="flex items-center gap-3">
          <MonthSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
          />

          {loading && (
            <span className="text-[10px] text-gray-400">
              Loading...
            </span>
          )}
        </div>

      </div>

      <div className="h-[250px] md:h-[300px] lg:h-[340px] mt-5">

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >

            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="#8B5CF6"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#8B5CF6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#202938"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: "#8A93A5",
                fontSize: 9,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={(v) =>
                v === 0 ? "₹0" : `₹${v / 1000}k`
              }
              tick={{
                fill: "#8A93A5",
                fontSize: 9,
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#fill)"
              activeDot={{
                r: 6,
                fill: "#8B5CF6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>
        ) : (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">
          No expense data for this month
        </p>
      </div>
    )}

      </div>

      <ChartStats stats={monthlyStats} />

    </div>
  );
};

export default MonthlyChart;