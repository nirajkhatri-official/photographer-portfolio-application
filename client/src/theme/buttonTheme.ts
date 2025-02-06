import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  fontSize: "16px",
  lineHeight: "20px",
  borderColor: "gray.300",
  backgroundColor: "white",
  textColor: "gray.700",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(255, 255, 255, .5)",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(255,255,255,0.5)",
    },
  },
});

const ghost = defineStyle({
  textColor: "primary.700",
});

const text = defineStyle({
  fontSize: "14px",
  lineHeight: "20px",
  borderColor: "gray.300",
  backgroundColor: "white",
  textColor: "primary.700",
  p: 0,
  h: "max-content",
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(255,255,255,0.5)",
    },
  },
});

const rounded = defineStyle({
  borderRadius: "28px",
  background: "gray.100",
  border: "1px solid #F2F4F7",
  padding: "8px",
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});

const warning = defineStyle({
  fontSize: "16px",
  lineHeight: "20px",
  borderColor: "gray.300",
  backgroundColor: "warning.600",
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(220, 104, 3, 0.5)",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(220, 104, 3, 0.5)",
    },
  },
});

const warningOutline = defineStyle({
  border: "1px",
  fontSize: "16px",
  lineHeight: "24px",
  borderColor: "warning.100",
  backgroundColor: "warning.100",
  fontFamily: "Quicksand",
  color: "warning.700",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  _disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "warning.100",
  },
  _hover: {
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      backgroundColor: "warning.100",
    },
  },
});

const error = defineStyle({
  fontSize: "16px",
  lineHeight: "20px",
  borderColor: "gray.300",
  backgroundColor: "error.600",
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(217, 45, 32, 0.5)",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(217, 45, 32, 0.5)",
    },
  },
});

const primaryButton = defineStyle({
  backgroundColor: "primary.600",
  color: "white",
  fontWeight: "600",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "16px",
  paddingRight: "16px",
  borderRadius: "8px",
  fontFamily: "QuickSand",
  fontSize: ["14px", "16px"],
  lineHeight: ["20px", "24px"],
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(8, 138, 178, 0.5)",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(8, 138, 178, 0.5)",
    },
  },
});

const secondary = defineStyle({
  backgroundColor: "primary.50",
  color: "primary.700",
  fontWeight: "600",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "16px",
  paddingRight: "16px",
  borderRadius: "8px",
  fontFamily: "QuickSand",
  fontSize: ["14px", "16px"],
  lineHeight: ["20px", "24px"],
  border: "1px",
  borderColor: "primary.600",
  _disabled: {
    cursor: "not-allowed",
    backgroundColor: "rgba(236, 253, 255, 1)",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(236, 253, 255, 1)",
    },
  },
});

const iconPrimary = defineStyle({
  border: "1px",
  borderColor: "gray.300",
  minW: 0,
  height: "max-content",
  borderRadius: "8px",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  backgroundColor: "white",
  _loading: {
    border: "1px",
    borderColor: "gray.200",
    color: "black",
    backgroundColor: "white",
  },
  _disabled: {
    border: "1px",
    borderColor: "gray.200",
    opacity: 0.5,
    backgroundColor: "white",
  },
  _hover: {
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "white",
    },
  },
});

const iconPrimaryDisabled = defineStyle({
  border: "1px",
  minW: 0,
  height: "max-content",
  borderRadius: "8px",
  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
  backgroundColor: "white",
  borderColor: "gray.200",
  opacity: 0.5,
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    backgroundColor: "primary.600",
    color: "white",
    fontWeight: "600",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "16px",
    paddingRight: "16px",
    borderRadius: "8px",
    fontFamily: "QuickSand",
    fontSize: ["14px", "16px"],
    lineHeight: ["20px", "24px"],
    _disabled: {
      cursor: "not-allowed",
      backgroundColor: "rgba(8, 138, 178, 0.5)",
    },
    _hover: {
      _disabled: {
        cursor: "not-allowed",
        backgroundColor: "rgba(8, 138, 178, 0.5)",
      },
    },
  },
  variants: {
    warningOutline,
    primaryButton,
    secondary,
    outline,
    ghost,
    text,
    warning,
    error,
    rounded,
    iconPrimary,
    iconPrimaryDisabled,
  },
  defaultProps: {
    variant: "primaryButton",
  },
});
