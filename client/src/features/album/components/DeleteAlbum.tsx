import ActionModal from "../../../components/Modal/ActionModal";
import { Button } from "@chakra-ui/react";
import { useDeleteAlbum } from "../apis/deleteAlbum";
import { useNavigate, useParams } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import useToast from "../../../hooks/useToast";

const DeleteAlbum = ({
  albumId,
  triggerButton,
}: {
  albumId?: string;
  triggerButton?: ReactElement;
}) => {
  const { successToast } = useToast();
  const [isDone, setIsDone] = useState(false);
  const { id } = useParams();
  const mutateDeleteAlbum = useDeleteAlbum();
  const navigate = useNavigate();

  useEffect(() => {
    return () => setIsDone(false);
  });
  return (
    <ActionModal
      isDone={isDone}
      triggerButton={triggerButton ?? <Button variant={"error"}>Delete</Button>}
      title="Delete Album"
      subtitle="Are you sure you want to delete? All photos associated with this album will also be deleted."
      footerButton={
        <Button
          isLoading={mutateDeleteAlbum?.isPending}
          onClick={() =>
            mutateDeleteAlbum.mutate(albumId ?? id, {
              onSuccess: (data) => {
                setIsDone(true);
                successToast(data?.data?.message);
                if (id) {
                  navigate(-1);
                }
              },
            })
          }
          variant={"error"}
        >
          Confirm
        </Button>
      }
    />
  );
};

export default DeleteAlbum;
