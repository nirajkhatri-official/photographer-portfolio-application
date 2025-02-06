export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IResetPasswordRequest {
  token: string;
  password: string;
}
export interface IForgotPasswordRequest {
  email: string;
}

export type ISignInError = {
  error: boolean;
  form_error: {
    email: string;
    password: string;
  };
};

export type ISignInResponse = {
  success: boolean;
  message: string;
  user: {
    id: string;
  };
};

export type IResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type IForotPasswordResponse = {
  success: boolean;
  message: string;
};

export type ILogoutResponseDTO = {
  message: string;
};
