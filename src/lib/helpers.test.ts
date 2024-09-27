import { describe, it, expect } from "vitest";
import { isChildOf, buildTree } from "./helpers"; // Adjust import paths as needed
import type { Item } from "./types";

describe("isChildOf", () => {
  const items: Item[] = [
    { id: "1", parentId: null, name: "Root", color: "red" },
    { id: "2", parentId: "1", name: "Child 1", color: "blue" },
    { id: "3", parentId: "2", name: "Child 2", color: "green" },
    { id: "4", parentId: "2", name: "Child 3", color: "yellow" },
    { id: "5", parentId: null, name: "Another Root", color: "purple" },
  ];

  const itemTree = buildTree(items);

  it("should return true for a direct child", () => {
    const child = items[1]; // Child 1
    const parentId = "1"; // Root
    expect(isChildOf(child, parentId, itemTree)).toBe(true);
  });

  it("should return true for an indirect child", () => {
    const child = items[2]; // Child 2
    const parentId = "1"; // Root
    expect(isChildOf(child, parentId, itemTree)).toBe(true);
  });

  it("should return false if the child is not related", () => {
    const child = items[4]; // Another Root
    const parentId = "1"; // Root
    expect(isChildOf(child, parentId, itemTree)).toBe(false);
  });

  it("should return false if the child has no parent (root level)", () => {
    const child = items[0]; // Root
    const parentId = "2"; // Child 1
    expect(isChildOf(child, parentId, itemTree)).toBe(false);
  });

  it("should return true for siblings sharing the same parent", () => {
    const child = items[3]; // Child 3
    const parentId = "1"; // Root (parent of Child 1)
    expect(isChildOf(child, parentId, itemTree)).toBe(true);
  });

  it("should return false when there is no parent-child relationship", () => {
    const child = items[1]; // Child 1
    const parentId = "5"; // Another Root (unrelated)
    expect(isChildOf(child, parentId, itemTree)).toBe(false);
  });
});
