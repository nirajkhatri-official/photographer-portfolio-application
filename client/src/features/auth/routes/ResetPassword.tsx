import { SubmitHandler, useForm } from "react-hook-form";
import {
  IResetPassword,
  ResetPasswordFormValidation,
} from "../schema/SignInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Flex, Text } from "@chakra-ui/react";
import useResetPassword from "../apis/resetPassword";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import { useNavigate, useParams } from "react-router-dom";
import ROUTE_CONSTANT from "../../../routes/ROUTE_CONSTANT";

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mutateResetPassword = useResetPassword();

  const { control, handleSubmit } = useForm<IResetPassword>({
    defaultValues: {
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(ResetPasswordFormValidation),
  });
  const handleFormSubmit: SubmitHandler<IResetPassword> = (data) => {
    mutateResetPassword.mutate(
      { ...data, token: id! },
      {
        onSuccess: () => {
          navigate("/sign-in");
        },
      }
    );
  };
  return (
    <Flex h={"100vh"} align={"center"} justify={"center"}>
      <Card flexDir={"column"} gap={"16px"} padding={"16px"}>
        <Text>Reset password</Text>
        <FormPasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          name="password"
          control={control}
        />
        <Flex gap={"16px"}>
          <Button onClick={handleSubmit(handleFormSubmit)}>
            Reset Password
          </Button>
          <Button
            variant={"outline"}
            onClick={() => navigate(ROUTE_CONSTANT.SIGN_IN)}
          >
            Back to login
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ResetPassword;
