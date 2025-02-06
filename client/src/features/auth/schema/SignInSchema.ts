import { z } from "zod";

export const SignInFormValidation = z.object({
  email: z.string().min(1, " ").email("Invalid email"),
  password: z.string().min(6, "Password must be of at least six digits."),
});

export const ForgetPasswordFormValidation = z.object({
  email: z.string().min(1, " ").email("Invalid email"),
});

export const ResetPasswordFormValidation = z.object({
  password: z.string().min(6, "Password must be of at least six digits."),
});

export const SignUpFormValidationSchema = z
  .object({
    firstName: z.string().min(1, " "),
    lastName: z.string().optional().nullable(),
    email: z.string().min(1, " ").email("Invalid email"),
    password: z.string().min(6, "Password must be of at least six digits."),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be of at least six digits."),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ISignUp = z.infer<typeof SignUpFormValidationSchema>;

export type ISignIn = Required<z.infer<typeof SignInFormValidation>>;
export type IForgetPassword = Required<
  z.infer<typeof ForgetPasswordFormValidation>
>;
export type IResetPassword = Required<
  z.infer<typeof ResetPasswordFormValidation>
>;
