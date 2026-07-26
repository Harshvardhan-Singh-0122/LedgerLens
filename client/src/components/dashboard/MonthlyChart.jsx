import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ChevronDown } from "lucide-react";
import ChartStats from "./ChartStats";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-violet-600 rounded-xl px-4 py-2 shadow-xl">
      <p className="text-white text-xs">{label}</p>

      <p className="text-white font-semibold mt-1">
        ₹{payload[0].value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const MonthlyChart = ({ monthlyTrend = [], monthlyStats }) => {
  const data = monthlyTrend.map((item) => ({
    day: new Date(item._id.year, item._id.month - 1).toLocaleString("en-US", {
      month: "short",
    }),

    amount: item.totalExpense,
  }));
  return (
    // <div className="mt-5 mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">
    <div className="mt-5 mx-4 md:mx-6 lg:mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-[12px] font-semibold">
          Monthly Spending Overview
        </h2>

        <button className="flex items-center gap-1 border border-[#2A3344] rounded-lg px-2.5 py-1 text-[10px] text-white">
          This Month
          <ChevronDown size={10} />
        </button>
      </div>

      {/* <div className="h-[250px] mt-5"> */}
      <div className="h-[250px] md:h-[300px] lg:h-[340px] mt-5">
        <ResponsiveContainer>
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
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.45} />

                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#202938" />

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
              domain={["auto", "auto"]}
              tickFormatter={(v) => (v === 0 ? "₹0" : `₹${v / 1000}k`)}
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
      </div>

      <ChartStats stats={monthlyStats} />
    </div>
  );
};

export default MonthlyChart;

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
// } from "recharts";

// import { ChevronDown } from "lucide-react";
// import ChartStats from "./ChartStats";

// const data = [
//   { day: "1 Jul", amount: 2000 },
//   { day: "3 Jul", amount: 5200 },
//   { day: "5 Jul", amount: 2500 },
//   { day: "7 Jul", amount: 6200 },
//   { day: "9 Jul", amount: 4300 },
//   { day: "11 Jul", amount: 9800 },
//   { day: "13 Jul", amount: 7200 },
//   { day: "15 Jul", amount: 6800 },
//   { day: "16 Jul", amount: 12450 },
//   { day: "18 Jul", amount: 7200 },
//   { day: "20 Jul", amount: 9800 },
//   { day: "22 Jul", amount: 15400 },
//   { day: "24 Jul", amount: 8600 },
//   { day: "27 Jul", amount: 10400 },
//   { day: "30 Jul", amount: 18200 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload) return null;

//   return (
//     <div className="bg-violet-600 rounded-xl px-4 py-2 shadow-xl">
//       <p className="text-white text-xs">{label}</p>

//       <p className="text-white font-semibold mt-1">
//         ₹{payload[0].value.toLocaleString()}
//       </p>
//     </div>
//   );
// };

// const MonthlyChart = () => {
//   return (
//     // <div className="mt-5 mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">
//     <div className="mt-5 mx-4 md:mx-6 lg:mx-4 rounded-[28px] bg-[#141C28] border border-[#222B38] p-5">

//       <div className="flex items-center justify-between">

//         <h2 className="text-white text-[12px] font-semibold">
//           Monthly Spending Overview
//         </h2>

//         <button className="flex items-center gap-1 border border-[#2A3344] rounded-lg px-2.5 py-1 text-[10px] text-white">
//             This Month
//             <ChevronDown size={10} />
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

//               <linearGradient
//                 id="fill"
//                 x1="0"
//                 y1="0"
//                 x2="0"
//                 y2="1"
//               >
//                 <stop
//                   offset="0%"
//                   stopColor="#8B5CF6"
//                   stopOpacity={0.45}
//                 />

//                 <stop
//                   offset="100%"
//                   stopColor="#8B5CF6"
//                   stopOpacity={0}
//                 />

//               </linearGradient>

//             </defs>

//             <CartesianGrid
//               vertical={false}
//               stroke="#202938"
//             />

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
//               ticks={[
//                 0,
//                 5000,
//                 10000,
//                 15000,
//                 20000,
//               ]}
//               tickFormatter={(v) =>
//                 v === 0 ? "₹0" : `₹${v / 1000}k`
//               }
//               tick={{
//                 fill: "#8A93A5",
//                 fontSize: 9,
//               }}
//               tickLine={false}
//               axisLine={false}
//             />

//             <Tooltip
//               content={<CustomTooltip />}
//             />

//             <ReferenceLine
//               x="16 Jul"
//               stroke="#555"
//               strokeDasharray="4 4"
//             />

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

//       <ChartStats />

//     </div>
//   );
// };

// export default MonthlyChart;
