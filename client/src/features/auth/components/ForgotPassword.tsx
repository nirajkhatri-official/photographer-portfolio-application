import React, { useEffect, useState } from "react";
import ActionModal from "../../../components/Modal/ActionModal";
import useForgotPassword from "../apis/forgotPassword";
import { Button } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ForgetPasswordFormValidation,
  IForgetPassword,
} from "../schema/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/forms/FormInput";

const ForgotPassword = () => {
  const [isDone, setIsDone] = useState(false);
  const mutateForgotPassword = useForgotPassword();
  const { control, handleSubmit, setError, reset } = useForm<IForgetPassword>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    resolver: zodResolver(ForgetPasswordFormValidation),
  });

  const handleFormSubmit: SubmitHandler<IForgetPassword> = (data) => {
    mutateForgotPassword.mutate(data, {
      onSuccess: () => {
        setIsDone(true);
        reset();
      },
    });
  };

  useEffect(() => {
    if (mutateForgotPassword?.error?.response as any) {
      const keys = Object.keys(
        mutateForgotPassword?.error?.response?.data?.form_error
      ) as "email"[];
      for (let key of keys) {
        setError(key, {
          message: mutateForgotPassword?.error?.response?.data?.form_error[key],
        });
      }
    }
  }, [mutateForgotPassword?.error]);

  useEffect(() => {
    return () => setIsDone(false);
  });

  return (
    <ActionModal
      isDone={isDone}
      title="Get Reset Password Link"
      footerButton={
        <Button
          isLoading={mutateForgotPassword.isPending}
          onClick={handleSubmit(handleFormSubmit)}
        >
          Send Email
        </Button>
      }
      triggerButton={
        <Button variant={"primary"} flex={1}>
          Forget Password
        </Button>
      }
      content={
        <FormInput
          label="Email"
          name="email"
          control={control}
          placeholder="Enter your email"
          required
        />
      }
    />
  );
};

export default ForgotPassword;
