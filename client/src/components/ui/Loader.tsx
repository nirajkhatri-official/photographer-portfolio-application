import { Flex, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      role="loading-indicator"
      data-cy="loading"
      flex={1}
      justify={"center"}
      align={"center"}
    >
      <Spinner />
    </Flex>
  );
};

export default Loader;
