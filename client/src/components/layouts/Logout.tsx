import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useLogoutUser } from "../../features/auth/apis/logout";
import { useNavigate } from "react-router-dom";
import ROUTE_CONSTANT from "../../routes/ROUTE_CONSTANT";

const Logout = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutateLogoutUser = useLogoutUser();

  return (
    <>
      <Button onClick={onOpen} variant={"error"}>
        Logout
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignSelf={"center"}>
          <ModalHeader>Logout ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to logout?</ModalBody>

          <ModalFooter>
            <Button variant={"outline"} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="error"
              onClick={() => {
                mutateLogoutUser.mutate();
                navigate(ROUTE_CONSTANT.SIGN_UP);
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logout;
