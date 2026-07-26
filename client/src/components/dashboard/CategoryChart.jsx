import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { ChevronDown } from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";

const colors = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#06B6D4",
];

const CategoryChart = ({ categoryDistribution = [] }) => {

  const totalExpense = categoryDistribution.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const data = categoryDistribution.map((item, index) => ({
    name: item._id,
    amount: item.totalAmount,
    value:
      totalExpense === 0
        ? 0
        : Math.round((item.totalAmount / totalExpense) * 100),
    color: colors[index % colors.length],
  }));

  return (
    // <div className="mx-4 mt-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-3">
    <div className="mx-4 md:mx-4 lg:mx-4 mt-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-[12px] font-semibold">
          Expense by Category
        </h2>

        <button className="flex items-center gap-1 border border-[#2A3344] rounded-lg px-2.5 py-1 text-[10px] text-white">
          This Month
          <ChevronDown size={10} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="w-[46%] h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                innerRadius={36}
                outerRadius={60}
                stroke="none"
                paddingAngle={4}
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>

              <text
                x="50%"
                y="43%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94A3B8"
                fontSize="11"
              >
                Total
              </text>
              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize="14"
                fontWeight="700"
              >
                {formatCurrency(totalExpense)}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span className="text-white text-[10px]">{item.name}</span>
              </div>

              <span className="text-gray-400 text-[10px]">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
      <button
        className="
    w-full
    mt-4
    py-2.5
    rounded-xl
    bg-violet-600
    hover:bg-violet-700
    text-white
    text-xs
    font-medium
    transition
  "
      >
        View Full Analytics
      </button>
    </div>
  );
};

export default CategoryChart;











// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// import { ChevronDown } from "lucide-react";

// const data = [
//   { name: "Food", value: 32, color: "#8B5CF6" },
//   { name: "Shopping", value: 24, color: "#3B82F6" },
//   { name: "Travel", value: 18, color: "#10B981" },
//   { name: "Bills", value: 15, color: "#F59E0B" },
//   { name: "Others", value: 11, color: "#EF4444" },
// ];

// const CategoryChart = () => {
//   return (
//     // <div className="mx-4 mt-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-3">
//     <div className="mx-4 md:mx-4 lg:mx-4 mt-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-3">
//       <div className="flex items-center justify-between">
//         <h2 className="text-white text-[12px] font-semibold">
//           Expense by Category
//         </h2>

//         <button className="flex items-center gap-1 border border-[#2A3344] rounded-lg px-2.5 py-1 text-[10px] text-white">
//           This Month
//           <ChevronDown size={10} />
//         </button>
//       </div>

//       <div className="flex items-center justify-between mt-2">
//         <div className="w-[46%] h-36">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 dataKey="value"
//                 innerRadius={36}
//                 outerRadius={60}
//                 stroke="none"
//                 paddingAngle={4}
//               >
//                 {data.map((item) => (
//                   <Cell key={item.name} fill={item.color} />
//                 ))}
//               </Pie>

//               <text
//                 x="50%"
//                 y="43%"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fill="#94A3B8"
//                 fontSize="11"
//               >
//                 Total
//               </text>
//               <text
//                 x="50%"
//                 y="57%"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fill="#ffffff"
//                 fontSize="14"
//                 fontWeight="700"
//               >
//                 ₹45,320
//               </text>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="flex-1 space-y-2">
//           {data.map((item) => (
//             <div key={item.name} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div
//                   className="w-3 h-3 rounded-full"
//                   style={{
//                     background: item.color,
//                   }}
//                 />

//                 <span className="text-white text-[10px]">{item.name}</span>
//               </div>

//               <span className="text-gray-400 text-[10px]">{item.value}%</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         className="
//     w-full
//     mt-4
//     py-2.5
//     rounded-xl
//     bg-violet-600
//     hover:bg-violet-700
//     text-white
//     text-xs
//     font-medium
//     transition
//   "
//       >
//         View Full Analytics
//       </button>
//     </div>
//   );
// };

// export default CategoryChart;
