import { Flex, StyleProps, createStandaloneToast } from "@chakra-ui/react";

const useToast = () => {
  const { toast } = createStandaloneToast();

  const loadingToast = (message: string | undefined) =>
    toast({
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
      render: () => (
        <Flex
          id="success-toast"
          color="white"
          p={3}
          borderRadius="8px"
          bg="warning.25"
          px={"16px"}
          py={"8px"}
          gap={"8px"}
          align={"center"}
          role="success-toast"
        >
          <Flex
            borderRadius={"28px"}
            bg={"warning.100"}
            p={"6px"}
            alignItems={"center"}
          ></Flex>
          <Flex fontWeight={"medium"} color={"gray.700"} fontSize={"16px"}>
            {message}
          </Flex>
        </Flex>
      ),
    });

  const successToast = (message: string | undefined) =>
    toast({
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
      render: () => (
        <Flex
          id="success-toast"
          color="white"
          p={3}
          borderRadius="8px"
          bg="success.100"
          px={"16px"}
          py={"8px"}
          gap={"8px"}
          align={"center"}
          role="success-toast"
        >
          <Flex
            borderRadius={"28px"}
            bg={"success.100"}
            p={"6px"}
            alignItems={"center"}
          ></Flex>
          <Flex fontWeight={"medium"} color={"gray.700"} fontSize={"16px"}>
            {message}
          </Flex>
        </Flex>
      ),
    });

  const errorToast = (
    message: string | undefined,
    containerStyles: StyleProps = {},
    wrapperStyles: StyleProps = {}
  ) =>
    toast({
      containerStyle: { ...containerStyles },
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",

      render: () => (
        <Flex
          id="error-toast"
          color="white"
          p={3}
          borderRadius="8px"
          bg="error.100"
          px={"16px"}
          py={"8px"}
          gap={"8px"}
          align={"center"}
          {...wrapperStyles}
        >
          <Flex
            borderRadius={"28px"}
            bg={"error.100"}
            p={"6px"}
            alignItems={"center"}
          ></Flex>
          <Flex fontWeight={"medium"} color={"gray.700"} fontSize={"16px"}>
            {message}
          </Flex>
        </Flex>
      ),
    });

  return {
    successToast,
    errorToast,
    loadingToast,
    toast,
  };
};

export default useToast;
