import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppProvider from "./providers/AppProvider.tsx";
import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer } = createStandaloneToast();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
    <ToastContainer />
  </StrictMode>
);
