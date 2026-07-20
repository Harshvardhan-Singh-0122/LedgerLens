import { z } from "zod";

import {
    TRANSACTION_TYPES,
    TRANSACTION_CATEGORIES,
    PAYMENT_METHODS,
    TRANSACTION_SOURCES,
} from "../constants/transaction.constants.js";


export const createTransactionSchema = z.object({
    transactionDate: z.coerce.date(),

    amount: z
        .number()
        .positive("Amount must be greater than 0"),

    type: z.enum(TRANSACTION_TYPES),

    merchant: z
        .string()
        .trim()
        .min(1, "Merchant is required"),

    category: z
        .enum(TRANSACTION_CATEGORIES)
        .optional(),

    paymentMethod: z
        .enum(PAYMENT_METHODS)
        .optional(),

    source: z
        .enum(TRANSACTION_SOURCES)
        .optional(),

    note: z
        .string()
        .trim()
        .optional(),

    tags: z
        .array(z.string())
        .optional(),

    location: z
        .string()
        .trim()
        .optional(),

    attachment: z
        .string()
        .trim()
        .optional(),
});

export const updateTransactionSchema = createTransactionSchema.partial();