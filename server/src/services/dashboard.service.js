import Transaction from "../models/transaction.model.js";

export const getDashboardSummary = async (userId) => {
    const summary = await Transaction.aggregate([
        {
            $match: {
                userId,
            },
        },
        {
            $group: {
                _id: "$type",
                total: {
                    $sum: "$amount",
                },
            },
        },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach((item) => {
        if (item._id === "Income") {
            totalIncome = item.total;
        } else if (item._id === "Expense") {
            totalExpense = item.total;
        }
    });

    return {
        totalIncome,
        totalExpense,
        currentBalance: totalIncome - totalExpense,
    };
};


export const getMonthlyExpenseTrend = async (userId) => {
    return await Transaction.aggregate([
        {
            $match: {
                userId,
                type: "Expense",
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$transactionDate" },
                    month: { $month: "$transactionDate" },
                },
                totalExpense: {
                    $sum: "$amount",
                },
            },
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
    ]);
};

export const getCategoryDistribution = async (userId) => {
    return await Transaction.aggregate([
        {
            $match: {
                userId,
                type: "Expense",
            },
        },
        {
            $group: {
                _id: "$category",
                totalAmount: {
                    $sum: "$amount",
                },
            },
        },
        {
            $sort: {
                totalAmount: -1,
            },
        },
    ]);
};


export const getRecentTransactions = async (userId, limit = 5) => {
    return await Transaction.find({ userId })
        .sort({ transactionDate: -1 })
        .limit(limit);
};