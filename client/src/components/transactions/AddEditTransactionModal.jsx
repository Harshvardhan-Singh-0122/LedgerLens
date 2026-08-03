import TransactionForm from "./TransactionForm";

const AddEditTransactionModal = ({
  open,
  onClose,
  transaction,
  onSuccess,
}) => {

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        bg-black/50
        flex
        items-end
      "
    >
      <div
        className="
          w-full
          bg-[#141C28]
          rounded-t-3xl
          border-t
          border-[#232B3B]
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <TransactionForm
          transaction={transaction}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
};

export default AddEditTransactionModal;