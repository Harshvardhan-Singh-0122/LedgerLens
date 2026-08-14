import { useContext, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AppRefreshContext } from "../../context/AppRefreshContext";
import { removeTransactionsByMonth } from "../../services/transaction.service";

const DeleteMonthButton = ({ selectedMonth, selectedYear }) => {
  const { refreshApp } = useContext(AppRefreshContext);

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const response = await removeTransactionsByMonth(
        selectedMonth,
        selectedYear,
      );

      if (response.deletedCount > 0) {
        toast.success(
          `${response.deletedCount} transaction${
            response.deletedCount === 1 ? "" : "s"
          } deleted successfully.`,
        );
      } else {
        toast.info("No transactions were found for this month.");
      }

      setShowModal(false);

      refreshApp();
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete transactions.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="
          w-full
          mt-4
          py-3
          rounded-2xl
          border
          border-red-500/30
          text-red-400
          bg-red-500/5
          hover:bg-red-500/10
          transition
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <Trash2 size={17} />
        Delete This Month
      </button>

      {showModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/60
            flex
            items-center
            justify-center
            px-4
          "
          onClick={() => {
            if (!deleting) {
              setShowModal(false);
            }
          }}
        >
          <div
            className="
              w-full
              max-w-md
              bg-[#141C28]
              border
              border-[#232B3B]
              rounded-3xl
              p-6
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-xl font-semibold">
              Delete{" "}
              {new Date(selectedYear, selectedMonth - 1).toLocaleString(
                "en-US",
                {
                  month: "long",
                },
              )}{" "}
              {selectedYear} Transactions?
            </h2>

            <p className="text-gray-400 text-sm mt-3 leading-6">
              This will permanently delete all transactions from this month.
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                className="
                  flex-1
                  py-3
                  rounded-2xl
                  border
                  border-[#2A3444]
                  text-white
                  disabled:opacity-50
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
                  rounded-2xl
                  bg-red-600
                  text-white
                  disabled:opacity-50
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

export default DeleteMonthButton;
