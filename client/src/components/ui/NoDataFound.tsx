import { Flex, Icon, Text } from "@chakra-ui/react";
import { BOX_PRIMARY } from "../../assets/svgs/index";

const NoDataFound = () => {
  return (
    <Flex flex={1} justify={"center"}>
      <Flex align={"center"} gap={"16px"} flexDir={"column"} justify={"center"}>
        <Flex
          w={"max-content"}
          borderRadius={"28px"}
          bg={"primary.50"}
          p={"8px"}
        >
          <Flex
            borderRadius={"28px"}
            bg={"primary.100"}
            p={"8px"}
            alignItems={"center"}
          >
            <Icon h={"24px"} w={"24px"} as={BOX_PRIMARY} />
          </Flex>
        </Flex>
        <Text fontWeight={"600"} fontFamily={"Quicksand"} color={"gray.900"}>
          No Data Found
        </Text>
      </Flex>
    </Flex>
  );
};

export default NoDataFound;
