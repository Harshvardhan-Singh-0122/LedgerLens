import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

import AuthContextProvider from "./context/AuthContext";
import DashboardFilterProvider from "./context/DashboardFilterContext";
import TransactionModalProvider from "./context/TransactionModalContext";
import AppRefreshProvider from "./context/AppRefreshContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <DashboardFilterProvider>
        <AppRefreshProvider>
          <TransactionModalProvider>
            <App />

            <Toaster richColors position="top-right" />
          </TransactionModalProvider>
        </AppRefreshProvider>
      </DashboardFilterProvider>
    </AuthContextProvider>
  </StrictMode>,
);
