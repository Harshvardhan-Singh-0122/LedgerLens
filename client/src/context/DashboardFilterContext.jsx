import { createContext, useState } from "react";

export const DashboardFilterContext = createContext();

const DashboardFilterProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );

  return (
    <DashboardFilterContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,

        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  );
};

export default DashboardFilterProvider;