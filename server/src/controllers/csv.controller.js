import {
    uploadCsv,
    importCsvTransactions,
} from "../services/csv.service.js";

export const uploadCsvController = async (req, res) => {
    try {

        const result = await uploadCsv(
            req.user._id,
            req.file
        );

        res.status(200).json({
            success: true,
            message: "CSV parsed successfully.",
            data: result,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const importCsvController = async (req, res) => {
    try {

        const result = await importCsvTransactions(
            req.user._id,
            req.body.transactions
        );

        res.status(200).json({
            success: true,
            message: "Transactions imported successfully.",
            data: result,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};