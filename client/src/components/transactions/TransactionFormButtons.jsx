// const TransactionFormButtons = ({
//   transaction,
//   onClose,
//   onSubmit,
// }) => {
//   return (
//     <div className="flex gap-3 mt-8">

//       <button
//         onClick={onClose}
//         className="
//           flex-1
//           py-3
//           rounded-xl
//           border
//           border-[#232B3B]
//           text-white
//         "
//       >
//         Cancel
//       </button>

//       <button
//         onClick={onSubmit}
//         className="
//           flex-1
//           py-3
//           rounded-xl
//           bg-violet-600
//           text-white
//           font-medium
//         "
//       >
//         {transaction ? "Update" : "Save"}
//       </button>

//     </div>
//   );
// };

// export default TransactionFormButtons;

//---------------------For edit and delete transaction feature----------------
const TransactionFormButtons = ({
  transaction,
  onClose,
  onSubmit,
  loading,
}) => {
  return (
    <div className="flex gap-3 mt-8">

      <button
        onClick={onClose}
        disabled={loading}
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
        onClick={onSubmit}
        disabled={loading}
        className="
          flex-1
          py-3
          rounded-xl
          bg-violet-600
          text-white
          font-medium
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? transaction
            ? "Updating..."
            : "Saving..."
          : transaction
          ? "Update"
          : "Save"}
      </button>

    </div>
  );
};

export default TransactionFormButtons;