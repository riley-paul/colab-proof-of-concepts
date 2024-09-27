import React from "react";

export default function useSelection<T>() {
  const [selection, setSelection] = React.useState<Set<T>>(new Set());
  const [lastSelected, setLastSelected] = React.useState<T | null>(null);

  const toggleSelection = (id: T | T[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setLastSelected(ids[ids.length - 1]);
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
    setLastSelected(null);
  };

  const select = (id: T | T[]) => {
    const ids = Array.isArray(id) ? id : [id];
    setSelection(new Set(ids));
    setLastSelected(ids[ids.length - 1]);
  };

  const selectLast = () => {
    if (lastSelected) {
      select(lastSelected);
    }
  };

  const isSelected = (id: T) => selection.has(id);

  return {
    selection,
    toggleSelection,
    clearSelection,
    select,
    isSelected,
    selectLast,
  };
}
