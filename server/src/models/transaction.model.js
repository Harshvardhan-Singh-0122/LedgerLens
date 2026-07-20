import mongoose from "mongoose";

import {
    TRANSACTION_TYPES,
    TRANSACTION_CATEGORIES,
    PAYMENT_METHODS,
    TRANSACTION_SOURCES,
    DEFAULT_CATEGORY,
    DEFAULT_PAYMENT_METHOD,
    DEFAULT_SOURCE,
    DEFAULT_CURRENCY
} from "../constants/transaction.constants.js";

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        transactionId: {
            type: String,
            default: null,
        },

        transactionDate: {
            type: Date,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            enum: TRANSACTION_TYPES,
            required: true,
        },

        merchant: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: TRANSACTION_CATEGORIES,
            default: DEFAULT_CATEGORY,
        },

        paymentMethod: {
            type: String,
            enum: PAYMENT_METHODS,
            default: DEFAULT_PAYMENT_METHOD,
        },

        source: {
            type: String,
            enum: TRANSACTION_SOURCES,
            default: DEFAULT_SOURCE,
        },

        currency: {
            type: String,
            default: DEFAULT_CURRENCY,
        },

        note: {
            type: String,
            default: "",
            trim: true,
        },

        originalDescription: {
            type: String,
            default: "",
        },

        tags: {
            type: [String],
            default: [],
        },

        location: {
            type: String,
            default: null,
        },

        attachment: {
            type: String,
            default: null,
        },

        isCategorized: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
transactionSchema.index({ userId: 1 });

transactionSchema.index({ userId: 1, transactionDate: -1 });

transactionSchema.index({ userId: 1, category: 1 });

transactionSchema.index({ userId: 1, merchant: 1 });

transactionSchema.index(
    { userId: 1, transactionId: 1 },
    {
        unique: true,
        sparse: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);



export default Transaction;