import { Button, Flex, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../../components/forms/FormInput";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useSignIn from "../apis/signIn";
import useAuthStore from "../store/useAuthStore";
import { ISignIn, SignInFormValidation } from "../schema/SignInSchema";
import { useEffect } from "react";
import useToast from "../../../hooks/useToast";
import ForgotPassword from "../components/ForgotPassword";
import ROUTE_CONSTANT from "../../../routes/ROUTE_CONSTANT";

const SignIn = () => {
  const { successToast } = useToast();
  const { handleUserLogin } = useAuthStore();
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(SignInFormValidation),
  });

  const mutateSignIn = useSignIn();

  const handleFormSubmit: SubmitHandler<ISignIn> = (data) => {
    mutateSignIn.mutate(data, {
      onSuccess: (data) => {
        successToast(data?.message);
        handleUserLogin(data);
        navigate("/album");
      },
    });
  };

  useEffect(() => {
    if (mutateSignIn?.error?.response as any) {
      const keys = Object.keys(
        mutateSignIn?.error?.response?.data?.form_error
      ) as (keyof ISignIn)[];
      for (let key of keys) {
        setError(key, {
          message: mutateSignIn?.error?.response?.data?.form_error[key],
        });
      }
    }
  }, [mutateSignIn?.error]);

  return (
    <Flex h={"100vh"} flexDir={"column"} justify={"center"} align={"center"}>
      <Flex
        padding={"16px"}
        borderRadius={"4px"}
        flexDir={"column"}
        justify={"center"}
        align={"center"}
        boxShadow={" 8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff"}
        gap={"16px"}
      >
        <Text fontWeight={"bold"} fontSize={"20px"} fontFamily={"Quicksand"}>
          Sign in
        </Text>
        <Flex gap={"20px"} w={["100%", "400px"]} flexDir={"column"}>
          <FormInput
            label="Email"
            name="email"
            control={control}
            placeholder="Enter your email"
            required
          />
          <FormPasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            name="password"
            control={control}
          />
          <Flex flexDir={["column", "row"]} flex={1} gap={"8px"}>
            <Button
              variant={"primary"}
              flex={1}
              onClick={handleSubmit(handleFormSubmit)}
              isLoading={mutateSignIn.isPending}
            >
              Sign In
            </Button>
            <ForgotPassword />
            <Button
              variant={"outline"}
              flex={1}
              onClick={() => navigate(ROUTE_CONSTANT.SIGN_UP)}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
