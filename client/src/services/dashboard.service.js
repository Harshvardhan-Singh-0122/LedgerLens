// import * as dashboardApi from "../api/dashboard.api";

// export const getDashboard = async () => {
//   const response = await dashboardApi.getDashboardData();
//   return response.data;
// };


//-----------------For updating the dashboard from Month wise button----------------
import * as dashboardApi from "../api/dashboard.api";

export const getDashboard = async (month, year) => {
  const response = await dashboardApi.getDashboardData(month, year);

  return response.data;
};