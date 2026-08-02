// import api from "./axios";

// export const getDashboardData = () => api.get("/dashboard");

//-----------------For updating the dashboard from Month wise button----------------
import api from "./axios";

export const getDashboardData = (month, year) =>
  api.get("/dashboard", {
    params: {
      month,
      year,
    },
  });