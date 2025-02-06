import queryClient from "../libs/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
