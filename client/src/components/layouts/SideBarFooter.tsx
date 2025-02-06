import { Box, Flex } from "@chakra-ui/react";
import Logout from "./Logout";

const SideBarFooter = () => {
  return (
    <Box>
      <Flex flexDir="column" gap="4px">
        <Logout />
      </Flex>
    </Box>
  );
};

export default SideBarFooter;
