import { Flex, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
import { useGetAllAlbums } from "../apis/getAllAlbums";
import NoDataFound from "../../../components/ui/NoDataFound";
import Loader from "../../../components/ui/Loader";
import AlbumCard from "../components/AlbumCard";

const Album = () => {
  const { isLoading, data } = useGetAllAlbums();
  const templateColumnsSize = useBreakpointValue({
    md: "1fr 1fr",
    lg: "1fr 1fr 1fr 1fr",
  });

  if (isLoading) return <Loader />;

  return (
    <Flex flex={1} h={"100vh"} overflowY={"auto"} flexDir={"column"}>
      <Flex
        bg={"white"}
        pos={"sticky"}
        top={"0"}
        padding="16px"
        borderBottomWidth={"1px"}
      >
        <Text fontWeight={"bold"}>All Albums</Text>
      </Flex>
      {!data?.data?.length ? (
        <NoDataFound />
      ) : (
        <SimpleGrid
          templateColumns={templateColumnsSize}
          padding={"24px"}
          gap={"16px"}
          flexWrap={"wrap"}
        >
          {data?.data?.map((el) => (
            <AlbumCard data={el} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default Album;
