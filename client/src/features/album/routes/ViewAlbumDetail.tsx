import { useNavigate, useParams } from "react-router-dom";
import { useGetAlbumById } from "../apis/getAlbumById";
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import Carousel from "../../../components/Carousel/Carousel";
import { ARROW_LEFT } from "../../../assets/svgs";
import DeleteAlbum from "../components/DeleteAlbum";
import EditAlbum from "../components/EditAlbum";
import useAuthStore from "../../auth/store/useAuthStore";

const ViewAlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const { data } = useGetAlbumById({
    id: id,
  });
  console.log(userInfo, data?.data?.userId, "infooo");

  return (
    <Flex flexDir={"column"} flex={1}>
      <Flex
        bg={"white"}
        padding="16px"
        borderBottomWidth={"1px"}
        align={"center"}
        w={"100%"}
        justify={"space-between"}
      >
        <Flex gap={"16px"} align={"center"}>
          <IconButton
            onClick={() => navigate(-1)}
            minH={0}
            minW={0}
            h={0}
            aria-label="navigate-back"
            icon={<ARROW_LEFT />}
            bg={"white"}
          />
          <Text fontWeight={"bold"}>{data?.data?.title}</Text>
        </Flex>
        {userInfo?.id === data?.data?.userId && (
          <Flex gap={"16px"}>
            <EditAlbum
              triggerButton={<Button>Edit</Button>}
              editData={data?.data}
            />
            <DeleteAlbum />
          </Flex>
        )}
      </Flex>
      <Flex flex={1} padding={"16px"} flexDir={"column"} gap={"16px"}>
        <Flex>
          <Text>Category :&nbsp;</Text>
          <Text>{data?.data?.title}</Text>
        </Flex>
        <Flex>
          <Text>Description :&nbsp;</Text>
          <Text>{data?.data?.title}</Text>
        </Flex>
        <Flex w={"500px"} h={"500px"}>
          <Carousel data={data?.data?.photos ?? []} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewAlbumDetail;
