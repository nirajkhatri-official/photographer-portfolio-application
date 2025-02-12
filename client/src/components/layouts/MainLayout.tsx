import {
  Flex,
  Grid,
  GridItem,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { Suspense } from "react";
import Loader from "../ui/Loader";
import MobileSidebar from "./MobileSidebar";

const MainLayout = () => {
  const ace = useBreakpoint("sm");
  console.log(ace, "ace");

  const templateColumnsSize = useBreakpointValue({
    md: "60px",
    lg: "235px",
    "2xl": "312px",
  });

  return (
    <Grid
      data-cy="main-layout"
      templateAreas={`'sidebar content'`}
      templateColumns={`${templateColumnsSize} 1fr`}
      minH="100vh"
    >
      <GridItem
        hideBelow={"lg"}
        px="16px"
        py="32px"
        h="100vh"
        bg="gray.25"
        area="sidebar"
        position="sticky"
        inset={0}
        zIndex={100}
        borderRight={"1px"}
        borderRightColor={"gray.200"}
        data-cy="sidebar"
      >
        <SideBar />
      </GridItem>
      <GridItem
        hideFrom={"lg"}
        px="16px"
        py="32px"
        h="100vh"
        bg="gray.25"
        area="sidebar"
        position="sticky"
        inset={0}
        zIndex={100}
        borderRight={"1px"}
        borderRightColor={"gray.200"}
        data-cy="sidebar"
        as={Flex}
        justify={"center"}
      >
        <MobileSidebar />
      </GridItem>
      <GridItem
        data-cy="content-area"
        as={Flex}
        overflowX={"auto"}
        area="content"
      >
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
