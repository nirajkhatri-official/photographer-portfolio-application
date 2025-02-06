import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IAlbum } from "../../types/album-type";
import { useLocation, useNavigate } from "react-router-dom";
import EditAlbum from "./EditAlbum";
import DeleteAlbum from "./DeleteAlbum";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AlbumCard = ({
  data,
  showActions,
}: {
  data: IAlbum;
  showActions?: boolean;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={`${BACKEND_URL}${data?.photos?.[0]}`}
          alt="Green double couch with wooden legs"
          objectFit={"cover"}
          borderRadius="lg"
        />
        <Stack
          cursor={"pointer"}
          onClick={() => navigate(`${pathname}/${data?.id}`)}
          mt="6"
          spacing="3"
        >
          <Heading size="md">{data?.title}</Heading>
          <Text>{data?.category}</Text>
          {!!data?.description && (
            <Text color="blue.600" fontSize="2xl">
              {data?.description}
            </Text>
          )}
        </Stack>
      </CardBody>
      {showActions && (
        <>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <EditAlbum
                triggerButton={<Button>Edit</Button>}
                editData={data}
              />
              <DeleteAlbum albumId={data?.id} />
            </ButtonGroup>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default AlbumCard;
