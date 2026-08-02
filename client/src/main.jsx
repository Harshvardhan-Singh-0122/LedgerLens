import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

import AuthContextProvider from "./context/AuthContext";
import DashboardFilterProvider from "./context/DashboardFilterContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <DashboardFilterProvider>
        <App />
        <Toaster richColors position="top-right" />
      </DashboardFilterProvider>
    </AuthContextProvider>
  </StrictMode>
);