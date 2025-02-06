import { Drawer } from "../Drawer/Drawer";
import SideBar from "./SideBar";
import { IconButton } from "@chakra-ui/react";
import { MENU } from "../../assets/svgs";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
  const [isDone, setIsDone] = useState(false);

  const closeDrawer = () => setIsDone(true);

  useEffect(() => {
    return () => setIsDone(false);
  });

  return (
    <Drawer
      isDone={isDone}
      triggerButton={
        <IconButton
          aria-label="menu"
          icon={<MENU />}
          bg={"white"}
          h={"20px"}
          w={"20px"}
          minH={0}
          minW={0}
        />
      }
      size="xs"
      hideFooter
    >
      <SideBar closeDrawer={closeDrawer} />
    </Drawer>
  );
};

export default MobileSidebar;
