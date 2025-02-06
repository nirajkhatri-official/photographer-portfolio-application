import { InputProps } from "@chakra-ui/react";
import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import FormInputWithIcon from "./FormInputWithIcon";
import { EYE } from "../../assets/svgs";

interface IFormPasswordInput<T extends FieldValues = FieldValues>
  extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

function FormPasswordInput<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
}: IFormPasswordInput<T>) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePassword = () => setPasswordVisible((prev) => !prev);

  return (
    <FormInputWithIcon
      label={label ? label : "Password"}
      placeholder={placeholder ? placeholder : "Enter your password"}
      required={required}
      variant="rightIcon"
      type={passwordVisible ? "text" : "password"}
      name={name}
      control={control}
      rightIcon={<EYE />}
      onClickRightIcon={togglePassword}
    />
  );
}

export default FormPasswordInput;
