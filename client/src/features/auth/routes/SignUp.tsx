import { Button, Flex, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/forms/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import FormPasswordInput from "../../../components/forms/FormPasswordInput";
import useSignUp from "../apis/signup";
import { useEffect } from "react";
import { ISignUp, SignUpFormValidationSchema } from "../schema/SignInSchema";
import ROUTE_CONSTANT from "../../../routes/ROUTE_CONSTANT";

const SignUp = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm<ISignUp>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(SignUpFormValidationSchema),
  });
  const mutateSignIn = useSignUp();

  const handleFormSubmit: SubmitHandler<ISignUp> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _, ...rest } = data;
    mutateSignIn.mutate(rest);
  };

  useEffect(() => {
    if (mutateSignIn?.error?.response as any) {
      const keys = Object.keys(
        mutateSignIn?.error?.response?.data?.form_error
      ) as (keyof ISignUp)[];
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
          Register form
        </Text>

        <Flex gap={"20px"} w={["100%", "400px"]} flexDir={"column"}>
          <FormInput
            label="First Name"
            name="firstName"
            control={control}
            placeholder="First Name"
            required
          />
          <FormInput
            label="Last Name"
            name="lastName"
            control={control}
            placeholder="Last Name"
          />
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
          <FormPasswordInput
            label="Confirm Password"
            placeholder="Enter your password again"
            required
            name="confirmPassword"
            control={control}
          />
          <Flex flexDir={["column", "row"]} flex={1} gap={"8px"}>
            <Button flex={1} onClick={handleSubmit(handleFormSubmit)}>
              Sign Up
            </Button>
            <Button
              variant={"outline"}
              flex={1}
              onClick={() => navigate(ROUTE_CONSTANT.SIGN_IN)}
            >
              Back to login
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
