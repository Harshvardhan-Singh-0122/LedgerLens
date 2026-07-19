import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
      <Toaster richColors position="top-right" />
    </AuthContextProvider>
  </StrictMode>
);