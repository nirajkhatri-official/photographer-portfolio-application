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
import { cloneElement, ReactElement, useEffect } from "react";

interface IActionModal {
  triggerButton?: ReactElement;
  title?: string;
  subtitle?: string;
  isDone?: boolean;
  footerButton?: ReactElement;
  content?: ReactElement;
}

const ActionModal = ({
  triggerButton,
  title,
  subtitle,
  isDone,
  footerButton,
  content,
}: IActionModal) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isDone) {
      onClose();
    }
  }, [isDone, onClose]);

  return (
    <>
      {cloneElement(triggerButton, {
        onClick: onOpen,
      })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignSelf={"center"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{subtitle ?? content}</ModalBody>

          <ModalFooter>
            <Button variant={"outline"} mr={3} onClick={onClose}>
              Close
            </Button>
            {footerButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionModal;
