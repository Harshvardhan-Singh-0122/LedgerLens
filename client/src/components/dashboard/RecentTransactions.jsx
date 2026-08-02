import {
  Pizza,
  ShoppingBag,
  Smartphone,
  Car,
  Receipt,
  GraduationCap,
  HeartPulse,
  CircleDollarSign,
} from "lucide-react";

import { formatCurrency } from "../../utils/formatCurrency";

import { useNavigate, useLocation } from "react-router-dom";

const categoryIcons = {
  Food: Pizza,
  Shopping: ShoppingBag,
  Travel: Car,
  Bills: Receipt,
  Education: GraduationCap,
  Healthcare: HeartPulse,
  Income: CircleDollarSign,
  Others: Smartphone,
};

const categoryColors = {
  Food: {
    bg: "bg-red-500/20",
    text: "text-red-400",
  },

  Shopping: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
  },

  Travel: {
    bg: "bg-green-500/20",
    text: "text-green-400",
  },

  Bills: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
  },

  Education: {
    bg: "bg-indigo-500/20",
    text: "text-indigo-400",
  },

  Healthcare: {
    bg: "bg-pink-500/20",
    text: "text-pink-400",
  },

  Income: {
    bg: "bg-violet-500/20",
    text: "text-violet-400",
  },

  Others: {
    bg: "bg-gray-500/20",
    text: "text-gray-400",
  },
};

const RecentTransactions = ({ transactions = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (transactions.length === 0) {
    return (
      <div className="mx-4 mt-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-6 text-center text-gray-400">
        No transactions found.
      </div>
    );
  }
  return (
    // <div className="mx-4 mt-5 mb-24 rounded-[28px] bg-[#141C28] border border-[#222B38] p-4">
    <div className="mx-4 md:mx-4 lg:mx-4 mt-5 mb-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-[12px] font-semibold">
          Recent Transactions
        </h2>

        <button 
          onClick={() => navigate("/transactions")}
          className="text-violet-400 text-[10px] font-medium">
          View All
        </button>
      </div>

      {/* Transactions */}
      <div>
        {transactions.map((item) => {
          const Icon = categoryIcons[item.category] || Smartphone;

          const colors = categoryColors[item.category] || categoryColors.Others;

          return (
            <div
              key={item.id}
              className="grid grid-cols-[1.8fr_1.2fr_0.8fr] items-center py-3 border-b border-[#222B38] last:border-none"
            >
              {/* Left Column */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon size={14} className={colors.text} />
                </div>

                <div className="overflow-hidden">
                  <p className="text-white text-[10px] font-medium truncate">
                    {item.merchantName}
                  </p>

                  <p className="text-violet-400 text-[8px] mt-0.5">
                    {item.category}
                  </p>
                </div>
              </div>

              {/* Middle Column */}
              <div>
                <p className="text-gray-300 text-[9px]">
                  {new Date(item.transactionDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-500 text-[8px] mt-0.5">UPI</p>
              </div>

              {/* Right Column */}
              <div className="text-right">
                <p
                  className={`text-[11px] font-semibold ${
                    item.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;

// import {
//   Pizza,
//   ShoppingBag,
//   Smartphone,
// } from "lucide-react";

// const transactions = [
//   {
//     id: 1,
//     icon: Pizza,
//     color: "bg-red-500/20",
//     iconColor: "text-red-400",
//     title: "Zomato Ltd.",
//     category: "Food & Dining",
//     date: "28 Jul, 08:45 PM",
//     method: "UPI",
//     amount: "-₹486.00",
//   },
//   {
//     id: 2,
//     icon: ShoppingBag,
//     color: "bg-yellow-500/20",
//     iconColor: "text-yellow-400",
//     title: "Amazon India",
//     category: "Shopping",
//     date: "28 Jul, 05:32 PM",
//     method: "UPI",
//     amount: "-₹1,299.00",
//   },
//   {
//     id: 3,
//     icon: Smartphone,
//     color: "bg-violet-500/20",
//     iconColor: "text-violet-400",
//     title: "PhonePe Cashback",
//     category: "Income",
//     date: "28 Jul, 01:10 PM",
//     method: "UPI",
//     amount: "+₹150.00",
//   },
//   {
//     id: 4,
//     icon: Pizza,
//     color: "bg-green-500/20",
//     iconColor: "text-green-400",
//     title: "Domino's Pizza",
//     category: "Food & Dining",
//     date: "27 Jul, 09:15 PM",
//     method: "UPI",
//     amount: "-₹720.00",
//   },
// ];

// const RecentTransactions = () => {
//   return (
//     // <div className="mx-4 mt-5 mb-24 rounded-[28px] bg-[#141C28] border border-[#222B38] p-4">
//     <div className="mx-4 md:mx-4 lg:mx-4 mt-5 mb-5 rounded-[28px] bg-[#141C28] border border-[#222B38] p-4">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">

//         <h2 className="text-white text-[12px] font-semibold">
//           Recent Transactions
//         </h2>

//         <button className="text-violet-400 text-[10px] font-medium">
//           View All
//         </button>

//       </div>

//       {/* Transactions */}
//       <div>

//         {transactions.map((item) => {

//           const Icon = item.icon;

//           return (

//             <div
//               key={item.id}
//               className="grid grid-cols-[1.8fr_1.2fr_0.8fr] items-center py-3 border-b border-[#222B38] last:border-none"
//             >

//               {/* Left Column */}
//               <div className="flex items-center gap-2">

//                 <div
//                   className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}
//                 >
//                   <Icon
//                     size={14}
//                     className={item.iconColor}
//                   />
//                 </div>

//                 <div className="overflow-hidden">

//                   <p className="text-white text-[10px] font-medium truncate">
//                     {item.title}
//                   </p>

//                   <p className="text-violet-400 text-[8px] mt-0.5">
//                     {item.category}
//                   </p>

//                 </div>

//               </div>

//               {/* Middle Column */}
//               <div>

//                 <p className="text-gray-300 text-[9px]">
//                   {item.date}
//                 </p>

//                 <p className="text-gray-500 text-[8px] mt-0.5">
//                   {item.method}
//                 </p>

//               </div>

//               {/* Right Column */}
//               <div className="text-right">

//                 <p
//                   className={`text-[11px] font-semibold ${
//                     item.amount.startsWith("+")
//                       ? "text-green-400"
//                       : "text-red-400"
//                   }`}
//                 >
//                   {item.amount}
//                 </p>

//               </div>

//             </div>

//           );
//         })}

//       </div>

//     </div>
//   );
// };

// export default RecentTransactions;
