import api from "./axios";

export const uploadCsv = (formData) =>
    api.post("/csv/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const importCsv = (transactions) =>
    api.post("/csv/import", {
        transactions,
    });