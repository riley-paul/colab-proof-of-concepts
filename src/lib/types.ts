import { z } from "zod";

export const DroppableAreaSchema = z.object({
  id: z.string().nullable(),
});

export const ItemSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  name: z.string(),
  color: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;

export type FlatItem = Item & {
  depth: number;
};
