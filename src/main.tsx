import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
      <Toaster richColors />
    </StoreContextProvider>
  </BrowserRouter>
);
