// import { Edit3, Trash2, X } from "lucide-react";

// const TransactionActionSheet = ({
//   transaction,
//   onClose,
//   onEdit,
// }) => {
//   return (
//     <div
//       className="
//         fixed
//         inset-0
//         z-[110]
//         bg-black/50
//         flex
//         items-end
//       "
//       onClick={onClose}
//     >
//       <div
//         className="
//           w-full
//           bg-[#141C28]
//           rounded-t-3xl
//           border-t
//           border-[#232B3B]
//           p-5
//         "
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

//         <button
//           onClick={() => onEdit(transaction)}
//           className="
//             w-full
//             flex
//             items-center
//             gap-3
//             p-4
//             text-white
//             rounded-xl
//             hover:bg-[#1C2635]
//           "
//         >
//           <Edit3 size={20} />
//           <span>Edit Transaction</span>
//         </button>

//         <button
//           className="
//             w-full
//             flex
//             items-center
//             gap-3
//             p-4
//             text-red-400
//             rounded-xl
//             hover:bg-[#1C2635]
//           "
//         >
//           <Trash2 size={20} />
//           <span>Delete Transaction</span>
//         </button>

//         <button
//           onClick={onClose}
//           className="
//             w-full
//             flex
//             items-center
//             gap-3
//             p-4
//             mt-2
//             text-gray-400
//             rounded-xl
//             hover:bg-[#1C2635]
//           "
//         >
//           <X size={20} />
//           <span>Cancel</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TransactionActionSheet;


//------------For adding the delete feature in the transaction action sheet----------------
import { Edit3, Trash2, X } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

import { AppRefreshContext } from "../../context/AppRefreshContext";
import { removeTransaction } from "../../services/transaction.service";

const TransactionActionSheet = ({
  transaction,
  onClose,
  onEdit,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { refreshApp } = useContext(AppRefreshContext);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    if (deleting) return;

    setShowDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    if (deleting) return;

    try {
      setDeleting(true);

      await removeTransaction(transaction._id);

      toast.success("Transaction deleted successfully.");

      refreshApp();

      onClose();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Transaction Action Sheet */}
      {!showDeleteConfirmation && (
        <div
          className="
            fixed
            inset-0
            z-[110]
            bg-black/50
            flex
            items-end
          "
          onClick={onClose}
        >
          <div
            className="
              w-full
              bg-[#141C28]
              rounded-t-3xl
              border-t
              border-[#232B3B]
              p-5
              mb-20
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

            <button
              onClick={() => onEdit(transaction)}
              className="
                w-full
                flex
                items-center
                gap-3
                p-4
                text-white
                rounded-xl
                hover:bg-[#1C2635]
              "
            >
              <Edit3 size={20} />
              <span>Edit Transaction</span>
            </button>

            <button
              onClick={handleDeleteClick}
              className="
                w-full
                flex
                items-center
                gap-3
                p-4
                text-red-400
                rounded-xl
                hover:bg-[#1C2635]
              "
            >
              <Trash2 size={20} />
              <span>Delete Transaction</span>
            </button>

            <button
              onClick={onClose}
              className="
                w-full
                flex
                items-center
                gap-3
                p-4
                mt-2
                text-gray-400
                rounded-xl
                hover:bg-[#1C2635]
              "
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Sheet */}
      {showDeleteConfirmation && (
        <div
          className="
            fixed
            inset-0
            z-[120]
            bg-black/50
            flex
            items-end
          "
          onClick={handleCancelDelete}
        >
            {/* Second */}
          <div
            className="
              w-full
              bg-[#141C28]
              rounded-t-3xl
              border-t
              border-[#232B3B]
              p-5
              mb-20
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />

            <h2 className="text-xl font-semibold text-white">
              Delete Transaction?
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancelDelete}
                disabled={deleting}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  border
                  border-[#232B3B]
                  text-white
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-red-500
                  text-white
                  font-medium
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionActionSheet;