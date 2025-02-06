import { Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import SideBarFooter from "./SideBarFooter";

const NAV_ITEM_LIST_DATA = [
  {
    name: "All Albums",
    to: "/album",
  },
  {
    name: "My Albums",
    to: "/my-albums",
  },
];

const SideBar = () => {
  const { pathname: currentUrlPath } = useLocation();
  return (
    <Flex height="100%" flexDir="column" gap={"48px"}>
      <Flex flexDir="column" justifyContent="space-between" height="100%">
        <Flex flexDirection={"column"} gap={"8px"}>
          {NAV_ITEM_LIST_DATA?.map(({ name, to }) => {
            const isActive =
              to === "/"
                ? currentUrlPath === "/"
                : currentUrlPath.startsWith(to!);
            const navItemColor = isActive
              ? {
                  backgroundColor: "#ECFDFF",
                  color: "#155B75",
                  borderRadius: "6px",
                }
              : {};
            return (
              <Flex
                as={Link}
                py={"8px"}
                px={"12px"}
                to={to}
                style={navItemColor}
              >
                <Text>{name}</Text>
              </Flex>
            );
          })}
        </Flex>
        <SideBarFooter />
      </Flex>
    </Flex>
  );
};

export default SideBar;
