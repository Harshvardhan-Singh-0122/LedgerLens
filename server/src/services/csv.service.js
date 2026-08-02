import fs from "fs";

import { parseNaviCsv } from "../parsers/navi.parser.js";
import { categorizeTransactions } from "../categorizer/categorizer.js";
import { checkDuplicateTransactions } from "./transactionImport.service.js";
import { importTransactions } from "./transactionImport.service.js";

export const uploadCsv = async (userId, file) => {

    if (!file) {
        throw new Error("CSV file is required.");
    }

    const transactions =
        await parseNaviCsv(file.path);

    const categorizedTransactions =
        categorizeTransactions(transactions);

    const finalTransactions =
        await checkDuplicateTransactions(
            userId,
            categorizedTransactions
        );

    fs.unlinkSync(file.path);

    return {

        summary: {

            totalTransactions:
                finalTransactions.length,

            newTransactions:
                finalTransactions.filter(
                    transaction => !transaction.isDuplicate
                ).length,

            duplicateTransactions:
                finalTransactions.filter(
                    transaction => transaction.isDuplicate
                ).length,

        },

        transactions: finalTransactions,

    };

};

export const importCsvTransactions = async (
    userId,
    transactions
) => {

    return await importTransactions(
        userId,
        transactions
    );

};