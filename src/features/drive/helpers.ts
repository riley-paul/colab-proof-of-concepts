import type { FlatItem, Item, ItemTree } from "@/features/drive/types";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";

export const generateItems = (count: number): Item[] => {
  const ids = Array.from({ length: count }, () => uuid());
  const items: Item[] = ids.map((id) => {
    const parentId = ids[Math.floor(Math.random() * ids.length)];
    return {
      id,
      parentId: Math.random() > 0.5 || parentId === id ? null : parentId,
      name: faker.lorem.words(),
      color: faker.color.rgb(),
    };
  });

  return items;
};

export const buildTree = (items: Item[]): ItemTree => {
  const map: ItemTree = new Map();

  items.forEach((item) => {
    const parentId = item.parentId;
    if (!map.has(parentId)) {
      map.set(parentId, []);
    }
    map.get(parentId)?.push(item);
  });

  map.forEach((group) => group.sort((a, b) => a.name.localeCompare(b.name)));

  return map;
};

export const flattenTree = (
  map: ItemTree,
  parentId: string | null = null,
  depth: number = 0,
): FlatItem[] => {
  const result: FlatItem[] = [];

  const children = map.get(parentId) || [];
  children.forEach((child) => {
    result.push({ ...child, depth });
    result.push(...flattenTree(map, child.id, depth + 1));
  });

  return result;
};

export const isChildOf = (
  child: Item,
  parentId: string | null,
  itemTree: ItemTree,
): boolean => {
  // Base case: if child has no parent, it's not a child of any item
  if (child.parentId === null) return false;

  // If the child's parentId matches the given parentId, it's a direct child
  if (child.parentId === parentId) return true;

  // Find the parent of the child using the child’s parentId
  const parentItems = itemTree.get(parentId);
  if (!parentItems) return false;

  // Recursively check if the parent of the child is a child of the given parentId
  const parentItem = parentItems.find((item) => item.id === child.parentId);
  console.log(parentItem);

  // If the immediate parent exists, recursively check if it is a child of the given parentId
  if (parentItem) {
    return isChildOf(parentItem, parentId, itemTree);
  }

  return false;
};
