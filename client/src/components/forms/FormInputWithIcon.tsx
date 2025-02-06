import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import FieldWrapper from "./FieldWrapper";

interface IFormInputWithIcon<T extends FieldValues = FieldValues>
  extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
  required?: boolean;
  label?: string;
  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  type?: "text" | "email" | "password" | "number";
  labelSize?: "xs" | "sm";
  onClickRightIcon?: () => void;
  variant?: "leftIcon" | "rightIcon" | "bothIcon";
  useFieldWrapper?: boolean;
}

function FormInputWithIcon<T extends FieldValues = FieldValues>({
  control,
  name,
  required = false,
  label = undefined,
  leftIcon = undefined,
  rightIcon = undefined,
  labelSize = "sm",
  onClickRightIcon = undefined,
  useFieldWrapper = true,
  // variant = 'leftIcon',
  ...rest
}: IFormInputWithIcon<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return useFieldWrapper ? (
    <FieldWrapper
      labelSize={labelSize}
      error={error}
      label={label}
      required={required}
    >
      <InputGroup>
        {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
        <Input
          height={"44px"}
          role="textbox"
          type={"text"}
          required={false}
          {...field}
          {...rest}
        />
        {rightIcon && (
          <InputRightElement cursor={"pointer"} onClick={onClickRightIcon}>
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
    </FieldWrapper>
  ) : (
    <InputGroup>
      {leftIcon && <InputLeftElement>{leftIcon}</InputLeftElement>}
      <Input
        height={"44px"}
        role="textbox"
        type={"text"}
        required={false}
        {...field}
        {...rest}
      />
      {rightIcon && (
        <InputRightElement cursor={"pointer"} onClick={onClickRightIcon}>
          {rightIcon}
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default FormInputWithIcon;
