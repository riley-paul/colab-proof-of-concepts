import type { FlatItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import { createPortal } from "react-dom";
import useDraggableState, {
  type DraggableStateClassnames,
} from "@/hooks/use-draggable-state";
import { File } from "lucide-react";
import DriveItemDragOverlay from "./drive-item-drag-overlay";

type Props = {
  item: FlatItem;
  selectedItemIds: Set<string>;
  isSelected?: boolean;
  setIsDragging?: (value: boolean) => void;
  isDragging?: boolean;
  showCheckbox?: boolean;
  setIsSelected?: (value: boolean) => void;
};

const draggableStateClasses: DraggableStateClassnames = {
  "is-dragging": "opacity-40",
  "is-dragging-over": "border-primary border-dashed",
};

const DriveItem: React.FC<Props> = (props) => {
  const {
    isSelected,
    isDragging,
    setIsDragging,
    selectedItemIds,
    showCheckbox,
    setIsSelected,
    item,
  } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const { setDraggableState, setDraggableIdle, draggableState } =
    useDraggableState();

  React.useEffect(() => {
    const element = ref.current;
    invariant(element, "element should be defined");

    return combine(
      draggable({
        element,
        getInitialData: () => {
          return item;
        },
        onDragStart: () => {
          setDraggableState({ type: "is-dragging" });
          setIsDragging?.(true);
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
            render({ container }) {
              setDraggableState({ type: "preview", container });
            },
          });
        },
        onDrop: () => {
          setDraggableIdle();
          setIsDragging?.(false);
        },
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          if (source.element === element) {
            return false;
          }

          if (isSelected) {
            return false;
          }

          return true;
        },
        getData: () => {
          return item;
        },
        getIsSticky: () => true,
        onDragEnter: () => {
          setDraggableState({ type: "is-dragging-over", closestEdge: null });
        },
        onDragLeave: () => {
          setDraggableIdle();
        },
        onDrop: () => {
          setDraggableIdle();
        },
      }),
    );
  });

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "flex h-10 items-center rounded-md border border-transparent px-3 text-sm transition-all ease-out hover:bg-muted",
          isSelected && "border-primary bg-secondary font-semibold",
          draggableStateClasses[draggableState.type],
          isSelected && isDragging && "opacity-40",
        )}
      >
        <div
          className={cn(
            "flex w-0 shrink-0 items-center overflow-hidden opacity-0 transition-all ease-out",
            showCheckbox && "w-7 opacity-100",
          )}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => setIsSelected?.(Boolean(value))}
          />
        </div>

        <span
          className="mr-2"
          style={{ paddingLeft: `${item.depth * 1.5}rem` }}
        >
          <File className="size-5" />
        </span>

        <span>{item.name}</span>
      </div>
      {draggableState.type === "preview"
        ? createPortal(
            <DriveItemDragOverlay
              itemName={item.name}
              selectionCount={Math.max(selectedItemIds.size, 1)}
            />,
            draggableState.container,
          )
        : null}
    </>
  );
};

export default DriveItem;
