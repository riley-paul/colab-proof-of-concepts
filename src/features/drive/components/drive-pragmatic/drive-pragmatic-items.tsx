import DrivePragmaticItem from "@/features/drive/components/drive-pragmatic/drive-pragmatic-item";
import {
  buildTree,
  flattenTree,
  generateItems,
  isChildOf,
} from "@/features/drive/helpers";
import React from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { DroppableAreaSchema } from "@/features/drive/types";
import { flushSync } from "react-dom";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import useSelection from "@/hooks/use-selection";
import { useEventListener } from "usehooks-ts";
import { useAtom } from "jotai";
import { isMultiSelectModeAtom, selectionAtom } from "../../store";
import { useVirtualizer } from "@tanstack/react-virtual";

const DrivePragmaticItems: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useAtom(
    isMultiSelectModeAtom,
  );

  const { selection, clearSelection, select, toggleSelection } =
    useSelection(selectionAtom);

  const [items, setItems] = React.useState(() => generateItems(1000));
  const ref = React.useRef<HTMLDivElement>(null);

  const tree = React.useMemo(() => buildTree(items), [items]);
  const flatItems = React.useMemo(() => flattenTree(tree), [tree]);
  React.useEffect(() => console.log(tree), [tree]);

  const rowVirtualizer = useVirtualizer({
    count: flatItems.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 40,
  });

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearSelection();
      setIsMultiSelectMode(false);
    }
  });

  React.useEffect(() => {
    const element = ref.current;
    invariant(element);

    return combine(
      monitorForElements({
        onDrop: ({ location, source }) => {
          const target = location.current.dropTargets[0];
          if (!target) return;

          const sourceData = DroppableAreaSchema.safeParse(source.data);
          const targetData = DroppableAreaSchema.safeParse(target.data);

          if (!targetData.success || !sourceData.success) return;

          const parentId = targetData.data.id;
          const sourceId = sourceData.data.id;

          if (parentId === sourceId) return;

          if (parentId === null) {
            console.log("dropped on root");
          }

          flushSync(() => {
            console.log("updating items");
            setItems((prev) =>
              prev.map((item) =>
                selection.has(item.id) || sourceId === item.id
                  ? { ...item, parentId }
                  : item,
              ),
            );
            clearSelection();
          });

          const element = document.querySelector(`[data-id="${sourceId}"]`);
          if (element instanceof HTMLElement) {
            triggerPostMoveFlash(element);
          }
        },
      }),
    );
  }, [ref, selection]);

  return (
    <div ref={ref} className="grid">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <DrivePragmaticItem
              key={virtualItem.key}
              item={flatItems[virtualItem.index]}
              select={isMultiSelectMode ? toggleSelection : select}
              // isChildOfSelected={selection
              //   .values()
              //   .map((id) => isChildOf(flatItems[virtualItem.index], id, tree))
              //   .some(Boolean)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrivePragmaticItems;
