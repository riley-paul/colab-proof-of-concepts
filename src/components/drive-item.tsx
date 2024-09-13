import type { Item } from "@/lib/types";
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
  item: Item;
  isSelected?: boolean;
  showCheckbox?: boolean;
  setIsSelected?: (value: boolean) => void;
};

const draggableStateClasses: DraggableStateClassnames = {
  "is-dragging": "opacity-40",
  "is-dragging-over": "border-primary border-dashed",
};

const DriveItem: React.FC<Props> = (props) => {
  const { isSelected, showCheckbox, setIsSelected, item } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const { setDraggableState, setDraggableIdle, draggableState } =
    useDraggableState();

  React.useEffect(() => {
    const element = ref.current;
    invariant(element, "element should be defined");

    return combine(
      draggable({
        element,
        onDragStart: () => {
          setDraggableState({ type: "is-dragging" });
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
        },
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => {
          if (source.element === element) {
            return false;
          }
          return true;
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
      })
    );
  });

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "flex items-center text-sm h-10 hover:bg-muted px-3 border border-transparent rounded transition-all ease-out",
          isSelected && "border-primary bg-secondary font-semibold",
          draggableStateClasses[draggableState.type]
        )}
      >
        <div
          className={cn(
            "opacity-0 w-0 shrink-0 overflow-hidden ease-out flex items-center transition-all",
            showCheckbox && "opacity-100 w-7"
          )}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => setIsSelected?.(Boolean(value))}
          />
        </div>

        <span className="mr-2">
          <File className="size-5" />
        </span>

        <span>{item.name}</span>
      </div>
      {draggableState.type === "preview"
        ? createPortal(
            <DriveItemDragOverlay itemName={item.name} selectionCount={4} />,
            draggableState.container
          )
        : null}
    </>
  );
};

export default DriveItem;
