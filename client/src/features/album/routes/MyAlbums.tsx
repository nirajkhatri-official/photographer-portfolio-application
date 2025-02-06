import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useGetMyAlbums } from "../apis/getMyAlbums";
import CreateAlbum from "../components/CreateAlbum";
import Loader from "../../../components/ui/Loader";
import NoDataFound from "../../../components/ui/NoDataFound";
import useAuthStore from "../../auth/store/useAuthStore";
import AlbumCard from "../components/AlbumCard";

const MyAlbums = () => {
  const {
    userInfo: { id },
  } = useAuthStore();

  const { isLoading, data } = useGetMyAlbums({
    id,
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
        justify={"space-between"}
        align={"center"}
      >
        <Text fontWeight={"bold"}>My Albums</Text>
        <Flex>
          <CreateAlbum />
        </Flex>
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
            <AlbumCard showActions data={el} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default MyAlbums;
