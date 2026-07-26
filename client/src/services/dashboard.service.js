import * as dashboardApi from "../api/dashboard.api";

export const getDashboard = async () => {
  const response = await dashboardApi.getDashboardData();
  return response.data;
};