import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
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

export const getAllTransactionsController = async (req, res) => {
    try {
        const transactions = await getAllTransactions(req.user._id);

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