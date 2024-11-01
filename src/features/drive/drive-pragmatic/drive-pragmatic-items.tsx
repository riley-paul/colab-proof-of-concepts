import DrivePragmaticItem from "@/features/drive/drive-pragmatic/drive-pragmatic-item";
import { buildTree, flattenTree, generateItems } from "@/lib/helpers";
import React from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { DroppableAreaSchema } from "@/lib/types";
import { flushSync } from "react-dom";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import useSelection from "@/hooks/use-selection";
import { useEventListener } from "usehooks-ts";
import { useAtom } from "jotai";
import { isMultiSelectModeAtom, selectionAtom } from "../store";

const DrivePragmaticItems: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useAtom(
    isMultiSelectModeAtom,
  );

  const { selection, clearSelection, select, toggleSelection } =
    useSelection<string>(selectionAtom);

  const [items, setItems] = React.useState(() => generateItems(50));
  const ref = React.useRef<HTMLDivElement>(null);

  const tree = React.useMemo(() => buildTree(items), [items]);
  console.log(tree);
  const flatItems = React.useMemo(() => {
    const flatItems = flattenTree(tree);
    return flatItems;
  }, [tree]);

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
      {flatItems.map((item) => (
        <DrivePragmaticItem
          key={item.id}
          item={item}
          select={isMultiSelectMode ? toggleSelection : select}
          tree={tree}
        />
      ))}
    </div>
  );
};

export default DrivePragmaticItems;
