import { Flex, MenuItem } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../../../components/forms/FormInput";
import { Drawer } from "../../../components/Drawer/Drawer";
import { IAlbum } from "../../types/album-type";
import EditFormFileUpload from "../../../components/forms/EditFormFileUpload";
import { useUpdateAlbum } from "../apis/updateAlbum";
import { ReactElement, useEffect, useState } from "react";
import { CreateAlbumSchema, ICreateAlbum } from "../schema/AlbumSchema";

const EditAlbum = ({
  editData,
  triggerButton,
}: {
  editData: IAlbum;
  triggerButton?: ReactElement;
}) => {
  const [isDone, setIsDone] = useState<boolean>(false);

  const { control, handleSubmit, setValue } = useForm<ICreateAlbum>({
    defaultValues: {
      title: editData?.title,
      category: editData?.category,
      description: editData?.description || "",
      photos: editData?.photos,
    },
    mode: "onChange",
    resolver: zodResolver(CreateAlbumSchema),
  });

  useEffect(() => {
    if (editData) {
      setValue("title", editData?.title);
      setValue("category", editData?.category);
      setValue("description", editData?.description);
      setValue("photos", editData?.photos);
    }
  }, [editData, setValue]);

  const mutateAlbum = useUpdateAlbum();

  const handleFormSubmit: SubmitHandler<ICreateAlbum> = (data) => {
    const existingPhotos = data?.photos?.filter(
      (photo) => typeof photo === "string" && photo?.includes("uploads")
    );
    const newPhoto = data?.photos?.filter((photo) => typeof photo != "string");

    const finalPayload = {
      ...data,
      existingPhotos,
      photos: newPhoto,
    };

    const formData = new FormData();
    Object.entries(finalPayload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file: File) => {
          formData.append(key, file); // Append files
        });
      } else {
        formData.append(key, value as string); // Append other fields
      }
    });
    console.log(editData, "data");

    mutateAlbum.mutate(
      { id: editData?.id, data: formData },
      {
        onSuccess: () => {
          setIsDone(true);
        },
      }
    );
  };
  useEffect(() => {
    return () => setIsDone(false);
  });
  return (
    <Drawer
      isDone={isDone}
      triggerButton={triggerButton ?? <MenuItem>Edit</MenuItem>}
      isSuccess={mutateAlbum.isSuccess}
      submittingData={mutateAlbum?.isPending}
      title="Edit Album"
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
        <EditFormFileUpload name="photos" control={control} />
      </Flex>
    </Drawer>
  );
};

export default EditAlbum;
