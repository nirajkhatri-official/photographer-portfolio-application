export const apiEndpoints = {
  FORGET_PASSWORD: "forget-password",
  LOGOUT: "logout",
  RESET_PASSWORD: "reset-password",
  SIGN_IN: "signin",
  SIGN_UP: "signup",

  ALBUMS: "albums",
  ALBUM_BY_ID: (id: string) => `albums/${id}`,
  MY_ALBUM: (id: string) => `my-albums/${id}`,
};
