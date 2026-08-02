import fs from "fs";
import csv from "csv-parser";

export const parseNaviCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const transactions = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          skipLines: 5,
        }),
      )
      .on("data", (row) => {
        if (row.Status !== "Success") {
          return;
        }

        const details = row["Transaction details"];

        const merchantMatch = details.match(/Paid to (.*?) \|/);

        const transactionIdMatch = details.match(
          /UPI txn ID:\s*([0-9A-Za-z]+)/,
        );

        const noteMatch = details.match(/Notes:\s*(.*)$/);

        const transaction = {
          transactionId: transactionIdMatch ? transactionIdMatch[1] : null,

          transactionDate: new Date(`${row.Date} ${row.Time}`),

          amount: Number(row.Amount.replace("₹", "").replace(/,/g, "").trim()),

          type: "Expense",

          merchant: merchantMatch ? merchantMatch[1].trim() : "Unknown",

          category: "Others",

          paymentMethod: "UPI",

          source: "CSV",

          currency: "INR",

          note: noteMatch ? noteMatch[1].trim() : "",

          originalDescription: details,

          tags: [],

          location: null,

          attachment: null,

          isCategorized: false,
        };

        transactions.push(transaction);
      })
      .on("end", () => {
        resolve(transactions);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
