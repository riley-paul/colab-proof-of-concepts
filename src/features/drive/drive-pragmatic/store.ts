import { atom } from "jotai";

export const isItemDraggingAtom = atom(false);
export const isMultiSelectModeAtom = atom(false);
export const selectionAtom = atom(new Set<string>());
