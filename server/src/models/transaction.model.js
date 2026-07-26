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
        userId: { //--------these create the relationship between user and transaction.-----
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        transactionId: {
            type: String,
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

transactionSchema.index({ userId: 1, transactionDate: -1 });   //-----Compound Index-----

transactionSchema.index({ userId: 1, category: 1 });

transactionSchema.index({ userId: 1, merchant: 1 });

transactionSchema.index(
    { userId: 1, transactionId: 1 },
    {
        unique: true,  //------unique: A user cannot have the same external transaction ID twice.------
        sparse: true,  //---With sparse: true, MongoDB ignores documents where transactionId is missing or null for uniqueness checks---
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);



export default Transaction;