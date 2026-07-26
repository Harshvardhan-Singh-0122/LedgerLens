import {
  ArrowDownToLine,
  Power,
  Wallet,
} from "lucide-react";

import SummaryCard from "./SummaryCard";
import { formatCurrency } from "../../utils/formatCurrency";

const SummaryCards = ({ summary }) => {
  return (
    <div className="mt-6 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-3">

        <SummaryCard
          icon={<ArrowDownToLine size={20} className="text-green-400" />}
          iconBg="rgba(34,197,94,.18)"
          title="Total Income"
          amount={formatCurrency(summary?.totalIncome)}
          change=""
          changeColor="text-green-400"
        />

        <SummaryCard
          icon={<Power size={20} className="text-red-400" />}
          iconBg="rgba(239,68,68,.18)"
          title="Total Expense"
          amount={formatCurrency(summary?.totalExpense)}
          change=""
          changeColor="text-red-400"
        />

        <SummaryCard
          icon={<Wallet size={20} className="text-violet-400" />}
          iconBg="rgba(139,92,246,.18)"
          title="Balance"
          amount={formatCurrency(summary?.currentBalance)}
          change=""
          changeColor="text-violet-400"
        />

      </div>
    </div>
  );
};

export default SummaryCards;











// import {
//   ArrowDownToLine,
//   Power,
//   Wallet,
// } from "lucide-react";

// import SummaryCard from "./SummaryCard";

// const SummaryCards = () => {
//   return (
//     // <div className="mt-6 px-4">
//     <div className="mt-6 px-4 md:px-6 lg:px-8">
//       <div className="grid grid-cols-3 gap-3">

//         <SummaryCard
//           icon={<ArrowDownToLine size={20} className="text-green-400" />}
//           iconBg="rgba(34,197,94,.18)"
//           title="Total Income"
//           amount="₹78,450"
//           change="↑ 12.6%"
//           changeColor="text-green-400"
//         />

//         <SummaryCard
//           icon={<Power size={20} className="text-red-400" />}
//           iconBg="rgba(239,68,68,.18)"
//           title="Total Expense"
//           amount="₹45,320"
//           change="↓ 8.4%"
//           changeColor="text-red-400"
//         />

//         <SummaryCard
//           icon={<Wallet size={20} className="text-violet-400" />}
//           iconBg="rgba(139,92,246,.18)"
//           title="Balance"
//           amount="₹33,130"
//           change="↑ 18.2%"
//           changeColor="text-violet-400"
//         />

//       </div>
//     </div>
//   );
// };

// export default SummaryCards;