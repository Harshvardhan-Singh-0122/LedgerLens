import api from "./axios";

export const getTransactions = (params) => {
  return api.get("/transactions", {
    params,
  });
};

export const getTransactionById = (id) => {
  return api.get(`/transactions/${id}`);
};

export const createTransaction = (data) => {
  return api.post("/transactions", data);
};

export const updateTransaction = (id, data) => {
  return api.put(`/transactions/${id}`, data);
};

export const deleteTransaction = (id) => {
  return api.delete(`/transactions/${id}`);
};

export const deleteTransactionsByMonth = (month, year) => {
  return api.delete("/transactions/month", {
    params: {
      month,
      year,
    },
  });
};