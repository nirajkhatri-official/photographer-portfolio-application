import { Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface IFormFileUpload<T extends FieldValues = FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  maxSize?: number;
  fileTypeMessage?: string;
  acceptedFileType?: Accept | undefined;
}

const FormFileUpload = <T extends FieldValues = FieldValues>({
  control,
  name,
  maxSize = 5000000,
  fileTypeMessage = ".PDF (max. 5 MB)",
  acceptedFileType = {
    "application/pdf": [".png", ".jpg", ".svg"],
  },
}: IFormFileUpload<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const isError = !!error;

  const handleFileChange = useCallback(
    (acceptedFiles: File[]) => {
      field.onChange(acceptedFiles);
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize,
    onDrop: handleFileChange,
    multiple: true, // Allow multiple files
    accept: acceptedFileType,
  });

  return (
    <>
      <Flex
        cursor={"pointer"}
        px={"24px"}
        py={"16px"}
        border={"1px"}
        borderColor={isError ? "error.600" : "gray.200"}
        borderRadius={"12px"}
        flexDir={"column"}
        align={"center"}
        gap={"4px"}
        {...getRootProps()}
      >
        <input
          {...field}
          value={undefined} // Set value to undefined to prevent it from overriding
          {...getInputProps()}
          type="file"
        />
        <Flex flexDir={"column"} gap={"12px"} align={"center"}>
          <Flex p={"5px"} bg={"gray.50"} borderRadius={"28px"}>
            <Flex p={"5px"} bg={"gray.100"} borderRadius={"28px"}>
              {/* <UPLOAD_CLOUD_2 /> */}
            </Flex>
          </Flex>
          {isDragActive ? (
            <Flex>
              <Text size={"sm"} color={"gray.600"}>
                Drop the files here
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text size={"sm"} fontWeight={"600"} color={"primary.700"}>
                Click to upload
              </Text>
              <Text size={"sm"} color={"gray.600"}>
                &nbsp;or drag and drop
              </Text>
            </Flex>
          )}
        </Flex>
        <Text color={"gray.600"} size={"xs"}>
          {fileTypeMessage}
        </Text>
      </Flex>

      {/* Display selected files */}
      {field.value && field.value.length > 0 && (
        <Flex flexDirection="column" gap="8px" mt="8px">
          {field.value.map((file: File, index: number) => (
            <Text key={index} size={"sm"} color={"gray.700"}>
              {file.name}
            </Text>
          ))}
        </Flex>
      )}

      {isError && <Text color={"error.500"}>{error?.message}</Text>}
    </>
  );
};

export default FormFileUpload;
