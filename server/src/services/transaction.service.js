import Transaction from "../models/transaction.model.js";

export const createTransaction = async (userId, transactionData) => {
    return await Transaction.create({
        userId,
        ...transactionData,
    });
};

// export const getAllTransactions = async (userId) => {
//     return await Transaction.find({ userId })
//         .sort({ transactionDate: -1 });  //  (-1) : newest first then oldest
// };


export const getAllTransactions = async (
    userId,
    filters = {}
) => {

    const query = {
        userId,
    };

    if (filters.month && filters.year) {

        const startDate = new Date(
            Number(filters.year),
            Number(filters.month) - 1,
            1
        );

        const endDate = new Date(
            Number(filters.year),
            Number(filters.month),
            0,
            23,
            59,
            59,
            999
        );

        query.transactionDate = {
            $gte: startDate,
            $lte: endDate,
        };
    }

    if (
        filters.type &&
        filters.type !== "All"
    ) {
        query.type = filters.type;
    }

    if (filters.category) {
        query.category = filters.category;
    }

    const sort = {};

    if (filters.sortBy === "Oldest") {
        sort.transactionDate = 1;
    } else if (filters.sortBy === "Highest Amount") {
        sort.amount = -1;
    } else if (filters.sortBy === "Lowest Amount") {
        sort.amount = 1;
    } else {
        sort.transactionDate = -1;
    }

    return await Transaction.find(query).sort(sort);
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