import { createContext, useState } from "react";

export const AppRefreshContext = createContext();

const AppRefreshProvider = ({ children }) => {

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshApp = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <AppRefreshContext.Provider
      value={{
        refreshKey,
        refreshApp,
      }}
    >
      {children}
    </AppRefreshContext.Provider>
  );

};

export default AppRefreshProvider;