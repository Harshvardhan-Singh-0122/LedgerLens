import { createContext, useState } from "react";

export const TransactionModalContext = createContext();

const TransactionModalProvider = ({ children }) => {

  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  return (
    <TransactionModalContext.Provider
      value={{
        showTransactionModal,
        setShowTransactionModal,

        selectedTransaction,
        setSelectedTransaction,
      }}
    >
      {children}
    </TransactionModalContext.Provider>
  );

};

export default TransactionModalProvider;