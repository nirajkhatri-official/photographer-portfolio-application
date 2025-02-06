import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const ErrorBoundary = ({ children }: { children: ReactElement }) => {
  return (
    <ReactErrorBoundary fallback={<Flex>Something went wrong</Flex>}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
