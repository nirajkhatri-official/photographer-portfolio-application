import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import queryClient from "../../../libs/queryClient";
import { ISignInResponse } from "../../types/auth-type";

type State = {
  isUserLoggedIn: boolean;
  userInfo?: {
    id: string;
  };
};

interface Actions {
  handleUserLogin: (data: ISignInResponse) => void;
  handleUserLogout: () => void;
}

const initialState: State = { isUserLoggedIn: false, userInfo: null };

const useAuthStore = create<State & Actions>()(
  persist(
    (set) => {
      const handleUserLogin = (data: ISignInResponse) => {
        set({
          isUserLoggedIn: true,
          userInfo: {
            id: data?.user?.id,
          },
        });
      };

      const handleUserLogout = () => {
        set(initialState);
        queryClient.clear();
        useAuthStore.persist.clearStorage();
      };

      return {
        ...initialState,
        handleUserLogin,
        handleUserLogout,
      };
    },
    {
      name: "authInfo",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
