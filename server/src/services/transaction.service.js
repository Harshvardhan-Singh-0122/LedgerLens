import Transaction from "../models/transaction.model.js";

export const createTransaction = async (userId, transactionData) => {
    return await Transaction.create({
        userId,
        ...transactionData,
    });
};

export const getAllTransactions = async (userId) => {
    return await Transaction.find({ userId })
        .sort({ transactionDate: -1 });  //  (-1) : newest first then oldest
};

export const getTransactionById = async (userId, transactionId) => {
    return await Transaction.findOne({
        _id: transactionId,
        userId,
    });
};

export const updateTransaction = async (
    userId,
    transactionId,
    updateData
) => {
    return await Transaction.findOneAndUpdate(
        {
            _id: transactionId,
            userId,
        },
        updateData,
        {
            new: true,   // ---------it returns the modified or updated document rather than the old.--
            runValidators: true,   //--------Mongoose does not run schema validators during updates.----
        }
    );
};

export const deleteTransaction = async (userId, transactionId) => {
    return await Transaction.findOneAndDelete({
        _id: transactionId,
        userId,
    });
};