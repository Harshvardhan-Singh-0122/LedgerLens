// // import { MoreVertical } from "lucide-react";
// // import CategoryIcon from "./CategoryIcon";

// // const TransactionItem = ({ transaction, isLast }) => {
// //   return (
// //     <div
// //       className={`flex items-center justify-between px-4 py-4 ${
// //         !isLast ? "border-b border-[#232B3B]" : ""
// //       }`}
// //     >
// //       <div className="flex items-center gap-3">
// //         <CategoryIcon category={transaction.category} />

// //         <div>
// //           <h3 className="text-white font-medium">
// //             {transaction.category}
// //           </h3>

// //           <p className="text-sm text-gray-400">
// //             {new Date(transaction.transactionDate).toLocaleTimeString([], {
// //               hour: "2-digit",
// //               minute: "2-digit",
// //             })}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="flex items-center gap-4">
// //         <p
// //           className={`font-semibold ${
// //             transaction.type === "Income"
// //               ? "text-green-400"
// //               : "text-red-400"
// //           }`}
// //         >
// //           {transaction.type === "Income" ? "+" : "-"}₹
// //           {transaction.amount}
// //         </p>

// //         <button className="text-gray-500 hover:text-white">
// //           <MoreVertical size={18} />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TransactionItem;


// //-------------------Add the Note in the transactino----------------
// import { MoreVertical, Clock3, NotebookPen } from "lucide-react";
// import CategoryIcon from "./CategoryIcon";

// const TransactionItem = ({ transaction, isLast }) => {
//   return (
//     <div
//       className={`flex items-center justify-between px-4 py-4 ${
//         !isLast ? "border-b border-[#232B3B]" : ""
//       }`}
//     >
//       {/* Left */}
//       <div className="flex items-center gap-3 flex-1">

//         <CategoryIcon category={transaction.category} />

//         <div className="min-w-0">

//           {/* Category */}
//           <h3 className="text-white font-medium">
//             {transaction.category}
//           </h3>

//           {/* Time + Note */}
//           <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 flex-wrap">

//             <div className="flex items-center gap-1">
//               <Clock3 size={12} />
//               <span>
//                 {new Date(transaction.transactionDate).toLocaleTimeString(
//                   [],
//                   {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   }
//                 )}
//               </span>
//             </div>

//             {transaction.note && (
//               <>
//                 <span>•</span>

//                 <div className="flex items-center gap-1 text-violet-300">
//                   <NotebookPen size={12} />
//                   <span className="truncate max-w-[130px]">
//                     {transaction.note}
//                   </span>
//                 </div>
//               </>
//             )}

//           </div>

//         </div>

//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">

//         <p
//           className={`font-semibold ${
//             transaction.type === "Income"
//               ? "text-green-400"
//               : "text-red-400"
//           }`}
//         >
//           {transaction.type === "Income" ? "+" : "-"}₹
//           {transaction.amount}
//         </p>

//         <button className="text-gray-500 hover:text-white">
//           <MoreVertical size={18} />
//         </button>

//       </div>

//     </div>
//   );
// };

// export default TransactionItem;


//-----------------For 3 dot feature-----------------
import { useContext, useState } from "react";
import { MoreVertical, Clock3, NotebookPen } from "lucide-react";

import CategoryIcon from "./CategoryIcon";
import TransactionActionSheet from "./TransactionActionSheet";

import { TransactionModalContext } from "../../context/TransactionModalContext";

const TransactionItem = ({ transaction, isLast }) => {
  const [showActionSheet, setShowActionSheet] = useState(false);

  const {
    setShowTransactionModal,
    setSelectedTransaction,
  } = useContext(TransactionModalContext);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionModal(true);
    setShowActionSheet(false);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between px-4 py-4 ${
          !isLast ? "border-b border-[#232B3B]" : ""
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-3 flex-1">
          <CategoryIcon category={transaction.category} />

          <div className="min-w-0">
            {/* Category */}
            <h3 className="text-white font-medium">
              {transaction.category}
            </h3>

            {/* Time + Note */}
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400 flex-wrap">
              <div className="flex items-center gap-1">
                <Clock3 size={12} />

                <span>
                  {new Date(transaction.transactionDate).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>

              {transaction.note && (
                <>
                  <span>•</span>

                  <div className="flex items-center gap-1 text-violet-300">
                    <NotebookPen size={12} />

                    <span className="truncate max-w-[130px]">
                      {transaction.note}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <p
            className={`font-semibold ${
              transaction.type === "Income"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {transaction.type === "Income" ? "+" : "-"}₹
            {transaction.amount}
          </p>

          <button
            onClick={() => setShowActionSheet(true)}
            className="text-gray-500 hover:text-white"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {showActionSheet && (
        <TransactionActionSheet
          transaction={transaction}
          onClose={() => setShowActionSheet(false)}
          onEdit={handleEdit}
        />
      )}
    </>
  );
};

export default TransactionItem;