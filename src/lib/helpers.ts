import type { FlatItem, Item } from "./types";
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

type ItemTree = Map<string | null, Item[]>;

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
