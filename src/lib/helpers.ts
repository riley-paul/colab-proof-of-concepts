import type { Item } from "./types";
import { v4 as uuid } from "uuid";

export const generateItems = (
  count: number,
  rootDirectoryId: string
): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: uuid(),
    parentId: rootDirectoryId,
    name: `Item ${index + 1}`,
  }));
};
