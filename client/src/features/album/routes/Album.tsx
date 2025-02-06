import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useGetAllAlbums } from "../apis/getAllAlbums";
import NoDataFound from "../../../components/ui/NoDataFound";
import Loader from "../../../components/ui/Loader";
import AlbumCard from "../components/AlbumCard";

const Album = () => {
  const { isLoading, data } = useGetAllAlbums();

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
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
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
