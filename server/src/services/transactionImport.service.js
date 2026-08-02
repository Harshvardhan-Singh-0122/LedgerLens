import Transaction from "../models/transaction.model.js";

export const checkDuplicateTransactions = async (
    userId,
    transactions
) => {

    const transactionIds = transactions
        .map(transaction => transaction.transactionId)
        .filter(Boolean);

    const existingTransactions = await Transaction.find({
        userId,
        transactionId: {
            $in: transactionIds,
        },
    }).select("transactionId");

    const existingIds = new Set(
        existingTransactions.map(
            transaction => transaction.transactionId
        )
    );

    const updatedTransactions = transactions.map(transaction => {

        return {
            ...transaction,
            isDuplicate:
                transaction.transactionId &&
                existingIds.has(transaction.transactionId),
        };

    });

    return updatedTransactions;
};


export const importTransactions = async (
    userId,
    transactions
) => {

    const newTransactions = transactions.filter(
        transaction => !transaction.isDuplicate
    );

    if (newTransactions.length === 0) {

        return {
            importedCount: 0,
        };

    }

    const transactionsToSave = newTransactions.map(
        ({ isDuplicate, ...transaction }) => ({
            userId,
            ...transaction,
        })
    );

    await Transaction.insertMany(transactionsToSave);

    return {
        importedCount: transactionsToSave.length,
    };
};