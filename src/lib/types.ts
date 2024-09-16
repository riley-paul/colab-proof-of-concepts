import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  name: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;

export type FlatItem = Item & {
  depth: number;
};
