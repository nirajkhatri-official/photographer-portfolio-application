import { defineStyleConfig } from "@chakra-ui/react";

export const inputTheme = defineStyleConfig({
  baseStyle: {
    field: {
      border: "1px",
      borderColor: "gray.300",
      borderRadius: "8px",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "400",
      px: "14px",
      py: "10px",
      width: "100%",
      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
      backgroundColor: "white",
      _placeholder: {
        color: "gray.400",
      },
      _focusVisible: {
        outline: "none",
      },
      _disabled: {
        opacity: 0.5,
        borderWidth: "1px",
        borderColor: "gray.300",
        backgroundColor: "gray.50",
      },
    },
    element: { h: "100%", w: "44px" },
  },
});
