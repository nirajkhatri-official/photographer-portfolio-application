import { z } from "zod";

export const CreateAlbumSchema = z.object({
  title: z.string().min(1, " "),
  category: z.string().min(1, " "),
  description: z.string().optional().nullable(),
  photos: z
    .array(z.instanceof(File).or(z.string()))
    .min(1, "At least one photo is required."),
});

export type ICreateAlbum = z.infer<typeof CreateAlbumSchema>;
