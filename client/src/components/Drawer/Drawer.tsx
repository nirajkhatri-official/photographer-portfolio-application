import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Drawer as ChakraDrawer,
} from "@chakra-ui/react";
import { cloneElement, ReactElement, useEffect } from "react";

export const Drawer = ({
  children,
  title,
  onSubmit,
  submittingData = false,
  triggerButton,
  isDone = false,
  size = "lg",
  hideFooter,
}: {
  triggerButton?: ReactElement;
  children: ReactElement;
  title?: string;
  onSubmit?: ({ onClose }: { onClose: () => void }) => void;
  submittingData?: boolean;
  isSuccess?: boolean;
  isDone?: boolean;
  size?: "xs" | "md" | "lg";
  hideFooter?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isDone) {
      onClose();
    }
  }, [isDone, onClose]);

  return (
    <>
      {triggerButton ? (
        cloneElement(triggerButton, {
          onClick: onOpen,
        })
      ) : (
        <Button onClick={onOpen}>Add New Album</Button>
      )}
      <ChakraDrawer size={size} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>

          {!hideFooter && (
            <DrawerFooter gap={"16px"}>
              <Button variant={"outline"} onClick={onClose}>
                Close
              </Button>
              <Button
                isLoading={submittingData}
                variant={"primary"}
                onClick={() => {
                  onSubmit({ onClose });
                }}
                type="submit"
              >
                Save
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};
