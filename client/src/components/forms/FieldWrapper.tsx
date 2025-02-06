import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import { FieldError } from "react-hook-form";

interface IFieldWrapper {
  label?: string;
  children: React.ReactElement;
  error?: FieldError | undefined;
  required?: boolean;
  labelSize?: "xs" | "sm"; // xs->12px , sm->14px
  row?: boolean;
}

const FieldWrapper = (props: IFieldWrapper) => {
  const {
    children,
    error,
    label,
    labelSize = "sm",
    required = false,
    row = false,
  } = props;

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <Flex
        flexDir={row ? "row" : "column"}
        flex={1}
        alignItems={row ? "center" : "flex-start"}
      >
        {label && (
          <FormLabel whiteSpace={"nowrap"} size={labelSize}>
            {label}
          </FormLabel>
        )}
        {children}
      </Flex>
      {error?.message?.trim() && (
        <FormErrorMessage color={"error.500"}>
          {error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FieldWrapper;
