import React from "react";

export default function useSelection<T>() {
  const [selection, setSelection] = React.useState<Set<T>>(new Set());

  const toggleSelection = (id: T | T[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setSelection((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => {
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
      });
      return next;
    });
  };

  const clearSelection = () => {
    setSelection(new Set());
  };

  const select = (id: T | T[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setSelection(new Set(ids));
  };

  const isSelected = (id: T) => selection.has(id);

  return { selection, toggleSelection, clearSelection, select, isSelected };
}
