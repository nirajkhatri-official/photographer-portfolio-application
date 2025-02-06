import { ChakraProvider } from "@chakra-ui/react";
import ReactQueryProvider from "./ReactQueryProvider";
import RouteProvider from "./RouteProvider";
import { Suspense } from "react";
import theme from "../theme";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Loader from "../components/ui/Loader";

const AppProvider = () => {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <ReactQueryProvider>
            <RouteProvider />
          </ReactQueryProvider>
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  );
};

export default AppProvider;
