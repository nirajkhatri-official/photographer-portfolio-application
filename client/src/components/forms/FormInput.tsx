import { Input, InputProps } from "@chakra-ui/react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import FieldWrapper from "./FieldWrapper";

interface IFormInput<T extends FieldValues = FieldValues> extends InputProps {
  control?: Control<T>;
  name: FieldPath<T>;
  required?: boolean;
  label?: string;
  type?: "text" | "email" | "password" | "number";
  labelSize?: "xs" | "sm";
  row?: boolean;
  customOnChangeEvents?: (event: any) => void;
}

function FormInput<T extends FieldValues = FieldValues>({
  control,
  name,
  required = false,
  label = undefined,
  labelSize = "sm",
  type = "text",
  row = false,
  customOnChangeEvents,
  ...rest
}: IFormInput<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const handleOnChangeEvent = (event: any) => {
    field.onChange(event);
    customOnChangeEvents && customOnChangeEvents(event);
  };
  console.log(error, "errpr");

  return (
    <FieldWrapper
      row={row}
      labelSize={labelSize}
      error={error}
      label={label}
      required={required}
    >
      <Input
        height={"44px"}
        type={type}
        required={false}
        {...field}
        onChange={handleOnChangeEvent}
        {...rest}
      />
    </FieldWrapper>
  );
}

export default FormInput;
