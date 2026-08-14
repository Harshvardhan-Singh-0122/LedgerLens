import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    deleteTransactionsByMonth,
} from "../services/transaction.service.js";

import {
    createTransactionSchema,
    updateTransactionSchema,
} from "../validations/transaction.validation.js";

export const createTransactionController = async (req, res) => {
    try {
        const validatedData = createTransactionSchema.parse(req.body);

        const transaction = await createTransaction(req.user._id, validatedData);

        res.status(201).json({
            success: true,
            message: "Transaction created successfully.",
            transaction,
        });
    } catch (error) {
        throw error;
    }
};

// export const getAllTransactionsController = async (req, res) => {
//     try {
//         const transactions = await getAllTransactions(req.user._id);

//         res.status(200).json({
//             success: true,
//             transactions,
//         });
//     } catch (error) {
//         throw error;
//     }
// };


export const getAllTransactionsController = async (req, res) => {
    try {
        const {
            month,
            year,
            type,
            category,
            sortBy,
        } = req.query;

        const transactions = await getAllTransactions(
            req.user._id,
            {
                month,
                year,
                type,
                category,
                sortBy,
            }
        );

        res.status(200).json({
            success: true,
            transactions,
        });
    } catch (error) {
        throw error;
    }
};

export const getTransactionByIdController = async (req, res) => {
    try {
        const transaction = await getTransactionById(
            req.user._id,
            req.params.id
        );

        res.status(200).json({
            success: true,
            transaction,
        });
    } catch (error) {
        throw error;
    }
};

export const updateTransactionController = async (req, res) => {
    try {
        const validatedData = updateTransactionSchema.parse(req.body);

        const transaction = await updateTransaction(
            req.user._id,
            req.params.id,
            validatedData
        );

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully.",
            transaction,
        });
    } catch (error) {
        throw error;
    }
};

export const deleteTransactionController = async (req, res) => {
    try {
        await deleteTransaction(req.user._id, req.params.id);

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully.",
        });
    } catch (error) {
        throw error;
    }
};


//-----------for adding the button for deleting all transactions of month-----------------
export const deleteTransactionsByMonthController = async (req, res) => {
    try {
        const month = Number(req.query.month);
        const year = Number(req.query.year);

        if (
            !Number.isInteger(month) ||
            month < 1 ||
            month > 12
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid month.",
            });
        }

        if (
            !Number.isInteger(year) ||
            year < 1900 ||
            year > 2100
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid year.",
            });
        }

        const deletedCount = await deleteTransactionsByMonth(
            req.user._id,
            month,
            year
        );

        res.status(200).json({
            success: true,
            message:
                deletedCount > 0
                    ? "Transactions deleted successfully."
                    : "No transactions were found for this month.",
            deletedCount,
        });
    } catch (error) {
        throw error;
    }
};