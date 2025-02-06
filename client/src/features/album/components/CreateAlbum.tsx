import { Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../../components/forms/FormInput";
import FormFileUpload from "../../../components/forms/FormFileUpload";
import { useCreateAlbum } from "../apis/createAlbum";
import { Drawer } from "../../../components/Drawer/Drawer";
import { useEffect, useState } from "react";
import { CreateAlbumSchema, ICreateAlbum } from "../schema/AlbumSchema";

const CreateAlbum = () => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<ICreateAlbum>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      photos: [],
    },
    mode: "onChange",
    resolver: zodResolver(CreateAlbumSchema),
  });

  const mutateAlbum = useCreateAlbum();

  const handleFormSubmit: SubmitHandler<ICreateAlbum> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file: File) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, value as string);
      }
    });
    mutateAlbum.mutate(formData, {
      onSuccess: () => {
        reset();
        setIsDone(true);
      },
    });
  };
  useEffect(() => {
    return () => setIsDone(false);
  });
  return (
    <Drawer
      isDone={isDone}
      isSuccess={mutateAlbum.isSuccess}
      submittingData={mutateAlbum?.isPending}
      title="Add New Album"
      onSubmit={() => {
        handleSubmit(handleFormSubmit)();
      }}
    >
      <Flex gap={"20px"} flexDir={"column"}>
        <FormInput
          label="Title"
          name="title"
          control={control}
          placeholder="Title"
          required
        />
        <FormInput
          required
          label="Category"
          name="category"
          control={control}
          placeholder="Category"
        />
        <FormInput
          label="Description"
          name="description"
          control={control}
          placeholder="Description"
        />
        <FormFileUpload name="photos" control={control} />
      </Flex>
    </Drawer>
  );
};

export default CreateAlbum;
