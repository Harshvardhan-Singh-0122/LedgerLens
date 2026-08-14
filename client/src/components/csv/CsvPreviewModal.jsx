// import CsvSummary from "./CsvSummary";
// import CsvTransactionCard from "./CsvTransactionCard";
// import { X } from "lucide-react";
// import { toast } from "sonner";

// import { useState, useEffect } from "react";
// import { importCsv } from "../../services/csv.service";

// const CsvPreviewModal = ({ open, onClose, data, onImportSuccess, }) => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setTransactions(data.transactions);
//     }
//   }, [data]);

//   if (!open || !data) return null;

//   const handleCategoryChange = (transactionId, category) => {
//     setTransactions(
//       transactions.map((transaction) =>
//         transaction.transactionId === transactionId
//           ? {
//               ...transaction,
//               category,
//               isCategorized: category !== "Others",
//             }
//           : transaction,
//       ),
//     );
//   };

// const handleImport = async () => {
//   try {
//     await importCsv(transactions);

//     toast.success("Transactions imported successfully.");

//     onClose();

//     if (onImportSuccess) {
//       onImportSuccess();
//     }

//   } catch (error) {
//     console.log(error);

//     toast.error("Import failed.");
//   }
// };

//   return (
//     <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl bg-[#141C28] rounded-3xl border border-[#232B3B] max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-[#232B3B]">
//           <h2 className="text-xl font-semibold text-white">
//             Preview Transactions
//           </h2>

//           <button onClick={onClose}>
//             <X className="text-gray-400" />
//           </button>
//         </div>

//         {/* Summary */}
//         <CsvSummary summary={data.summary} />

//         {/* Transactions */}
//         <div className="h-[450px] overflow-y-auto p-4 space-y-3">
//           {transactions.map((transaction, index) => (
//             <CsvTransactionCard
//               key={index}
//               transaction={transaction}
//               onCategoryChange={handleCategoryChange}
//             />
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="p-5 border-t border-[#232B3B] flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 rounded-xl border border-[#232B3B] text-white"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleImport}
//             className="px-5 py-2 rounded-xl bg-violet-600 text-white"
//           >
//             Import {data.summary.newTransactions} Transactions
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CsvPreviewModal;



//--------------for adjustign the footer of this preview page----------------

import CsvSummary from "./CsvSummary";
import CsvTransactionCard from "./CsvTransactionCard";
import { X } from "lucide-react";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { importCsv } from "../../services/csv.service";

const CsvPreviewModal = ({
  open,
  onClose,
  data,
  onImportSuccess,
}) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data) {
      setTransactions(data.transactions);
    }
  }, [data]);

  if (!open || !data) return null;

  const handleCategoryChange = (transactionId, category) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.transactionId === transactionId
          ? {
              ...transaction,
              category,
              isCategorized: category !== "Others",
            }
          : transaction
      )
    );
  };

  const handleImport = async () => {
    try {
      await importCsv(transactions);

      toast.success("Transactions imported successfully.");

      onClose();

      if (onImportSuccess) {
        onImportSuccess();
      }
    } catch (error) {
      console.log(error);

      toast.error("Import failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      <div
        className="
          w-full
          max-w-3xl
          bg-[#141C28]
          rounded-3xl
          border
          border-[#232B3B]
          max-h-[90vh]
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#232B3B] shrink-0">

          <h2 className="text-xl font-semibold text-white">
            Preview Transactions
          </h2>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>

        </div>

        {/* Summary */}
        <div className="shrink-0">
          <CsvSummary summary={data.summary} />
        </div>

        {/* Transactions */}
        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            p-4
            space-y-3
          "
        >
          {transactions.map((transaction, index) => (
            <CsvTransactionCard
              key={index}
              transaction={transaction}
              onCategoryChange={handleCategoryChange}
            />
          ))}
        </div>

        {/* Footer */}
        <div
  className="
    shrink-0
    p-4
    sm:p-5
    border-t
    border-[#232B3B]
    flex
    flex-col
    sm:flex-row
    justify-end
    gap-3
  "
>
          <button
            onClick={onClose}
            className="
              w-full
              sm:w-auto
              px-5
              py-2
              rounded-xl
              border
              border-[#232B3B]
              text-white
            "
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            className="
              w-full
              sm:w-auto
              px-5
              py-2
              rounded-xl
              bg-violet-600
              text-white
            "
          >
            Import {data.summary.newTransactions} Transactions
          </button>

        </div>

      </div>

    </div>
  );
};

export default CsvPreviewModal;