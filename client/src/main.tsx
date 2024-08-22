// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import SocketContextProvider from "./context/socketContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </StrictMode>
);
