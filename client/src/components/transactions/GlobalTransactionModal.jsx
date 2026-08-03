import { useContext } from "react";

import { TransactionModalContext } from "../../context/TransactionModalContext";

import AddEditTransactionModal from "./AddEditTransactionModal";

const GlobalTransactionModal = () => {

  const {
    showTransactionModal,
    setShowTransactionModal,

    selectedTransaction,
  } = useContext(TransactionModalContext);

  return (
    <AddEditTransactionModal
      open={showTransactionModal}
      onClose={() => setShowTransactionModal(false)}
      transaction={selectedTransaction}
      onSuccess={() => {}}
    />
  );
};

export default GlobalTransactionModal;