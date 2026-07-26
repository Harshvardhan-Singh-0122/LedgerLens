import * as transactionApi from "../api/transaction.api";

export const getAllTransactions = async (params) => {
  const response = await transactionApi.getTransactions(params);
  return response.data;
};

export const getSingleTransaction = async (id) => {
  const response = await transactionApi.getTransactionById(id);
  return response.data;
};

export const addTransaction = async (data) => {
  const response = await transactionApi.createTransaction(data);
  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await transactionApi.updateTransaction(id, data);
  return response.data;
};

export const removeTransaction = async (id) => {
  const response = await transactionApi.deleteTransaction(id);
  return response.data;
};