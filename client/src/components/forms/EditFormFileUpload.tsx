import { Flex, Text, Image, IconButton } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { CLOSE } from "../../assets/svgs";

interface IEditFormFileUpload<T extends FieldValues = FieldValues> {
  control?: Control<T>;
  name: FieldPath<T>;
  maxSize?: number;
  fileTypeMessage?: string;
  acceptedFileType?: Accept | undefined;
  fileErrorMessage?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EditFormFileUpload = <T extends FieldValues = FieldValues>({
  control,
  name,
  maxSize = 5000000,
  fileTypeMessage = "Supported formats: .PNG, .JPG, .SVG (max. 5 MB)",
  acceptedFileType = {
    "image/*": [".png", ".jpg", ".svg"],
  },
}: IEditFormFileUpload<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [existingImages, setExistingImages] = useState<string[]>(
    field.value?.filter((item: string | File) => typeof item === "string") || []
  );
  const [newFiles, setNewFiles] = useState<File[]>(
    field.value?.filter((item: string | File) => item instanceof File) || []
  );

  const isError = !!error;

  const handleFileChange = useCallback(
    (acceptedFiles: File[]) => {
      setNewFiles([...newFiles, ...acceptedFiles]);
      field.onChange([...existingImages, ...newFiles, ...acceptedFiles]);
    },
    [newFiles, existingImages, field]
  );

  const removeFile = (index: number) => {
    const updatedFiles = newFiles.filter((_, i) => i !== index);
    setNewFiles(updatedFiles);
    field.onChange([...existingImages, ...updatedFiles]);
  };

  const removeExistingImage = (index: number) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages);
    field.onChange([...updatedImages, ...newFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize,
    onDrop: handleFileChange,
    multiple: true,
    accept: acceptedFileType,
  });

  return (
    <>
      <Flex
        cursor={"pointer"}
        px={"24px"}
        py={"16px"}
        border={"1px"}
        borderColor={isError ? "red.600" : "gray.200"}
        borderRadius={"12px"}
        flexDir={"column"}
        align={"center"}
        gap={"4px"}
        {...getRootProps()}
      >
        <input {...field} value={undefined} {...getInputProps()} type="file" />
        <Flex flexDir={"column"} gap={"12px"} align={"center"}>
          {isDragActive ? (
            <Text size={"sm"} color={"gray.600"}>
              Drop the files here
            </Text>
          ) : (
            <Text size={"sm"} fontWeight={"600"} color={"primary.700"}>
              Click to upload
            </Text>
          )}
        </Flex>
        <Text color={"gray.600"} size={"xs"}>
          {fileTypeMessage}
        </Text>
      </Flex>
      {console.log(existingImages, "images")}
      {/* Display existing images */}
      {existingImages.length > 0 && (
        <Flex wrap="wrap" gap="10px" mt="10px">
          {existingImages.map((url, index) => (
            <Flex key={index} position="relative">
              <Image
                src={`${BACKEND_URL}${url}`}
                h="100px"
                w="100px"
                borderRadius="8px"
              />
              <IconButton
                icon={<CLOSE />}
                aria-label="Delete image"
                size="xs"
                position="absolute"
                top="5px"
                right="5px"
                bg={"transparent"}
                onClick={() => removeExistingImage(index)}
              />
            </Flex>
          ))}
        </Flex>
      )}

      {/* Display new uploaded files */}
      {newFiles.length > 0 && (
        <Flex flexDirection="column" gap="8px" mt="8px">
          {newFiles.map((file, index) => (
            <Flex key={index} alignItems="center">
              <Text size={"sm"} color={"gray.700"}>
                {file.name}
              </Text>
              <IconButton
                icon={<CLOSE />}
                aria-label="Delete file"
                size="xs"
                bg={"white"}
                ml="8px"
                onClick={() => removeFile(index)}
              />
            </Flex>
          ))}
        </Flex>
      )}

      {error?.message && <Text color={"red.500"}>{error.message}</Text>}
    </>
  );
};

export default EditFormFileUpload;
