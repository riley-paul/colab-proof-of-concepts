import DrivePragmaticItem from "@/features/drive/drive-pragmatic/drive-pragmatic-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import useScrollShadow from "@/hooks/use-scroll-shadow";
import {
  buildTree,
  flattenTree,
  generateItems,
  isChildOf,
} from "@/lib/helpers";
import { cn } from "@/lib/utils";
import React from "react";
import {
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { DroppableAreaSchema } from "@/lib/types";
import { flushSync } from "react-dom";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import useSelection from "@/hooks/use-selection";
import { useEventListener } from "usehooks-ts";

const DrivePragmaticItems: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const { selection, clearSelection, select, toggleSelection, selectLast } =
    useSelection<string>();

  const [items, setItems] = React.useState(() => generateItems(50));

  const { listRef, isScrolled } = useScrollShadow();

  const tree = React.useMemo(() => buildTree(items), [items]);
  console.log(tree);
  const flatItems = React.useMemo(() => {
    const flatItems = flattenTree(tree);
    return flatItems;
  }, [tree]);

  const [isDragOver, setIsDragOver] = React.useState(false);

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      clearSelection();
      setIsMultiSelectMode(false);
    }
  });

  React.useEffect(() => {
    const element = listRef.current;
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
      // dropTargetForElements({
      //   element,
      //   getData: () => {
      //     return { id: null };
      //   },
      //   onDragEnter: () => {
      //     setIsDragOver(true);
      //   },
      //   onDragLeave: () => {
      //     setIsDragOver(false);
      //   },
      //   onDrop: () => {
      //     setIsDragOver(false);
      //   },
      // }),
    );
  }, [listRef, selection]);

  return (
    <Card className={cn(isDragOver && "border-primary")}>
      <CardHeader
        className={cn(
          "transitional-colors border-b border-transparent ease-in-out",
          isScrolled && "border-border",
        )}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Drive</CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {selection.size} items selected
            </span>
            <Toggle
              title="Multi-select mode"
              className="h-8 w-8 p-0"
              pressed={isMultiSelectMode}
              onPressedChange={(value) => {
                selectLast();
                setIsMultiSelectMode(value);
              }}
            >
              <i className="fa-solid fa-check-double text-lg" />
            </Toggle>
          </div>
        </div>
        <CardDescription>
          Mockup of Drive using Pragmatic Drag and Drop library. Try dragging an
          item onto another item to change it's parent, or move multiple items
          at a time using multi-select mode.
        </CardDescription>
      </CardHeader>
      <CardContent
        ref={listRef}
        className="grid max-h-[30rem] overflow-auto px-3"
      >
        {flatItems.map((item) => (
          <DrivePragmaticItem
            key={item.id}
            item={item}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            selectedItemIds={selection}
            showCheckbox={isMultiSelectMode}
            isSelected={selection.has(item.id)}
            select={isMultiSelectMode ? toggleSelection : select}
            tree={tree}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default DrivePragmaticItems;
