import * as csvApi from "../api/csv.api";

export const uploadCsv = async (formData) => {
    const response = await csvApi.uploadCsv(formData);
    return response.data;
};

export const importCsv = async (transactions) => {
    const response = await csvApi.importCsv(transactions);
    return response.data;
};