import type { FlatItem } from "@/features/drive/types";
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
import DriveItemDragOverlay from "../drive-item-drag-overlay";
import { useAtom, useAtomValue } from "jotai";
import {
  isItemDraggingAtom,
  isMultiSelectModeAtom,
  selectionAtom,
} from "../../store";
import useSelection from "@/hooks/use-selection";

type Props = {
  item: FlatItem;
  select?: (value: string) => void;
  isChildOfSelected?: boolean;
};

const draggableStateClasses: DraggableStateClassnames = {
  "is-dragging": "opacity-40",
  "is-dragging-over": "border-primary border-dashed",
};

const DrivePragmaticItem: React.FC<Props> = (props) => {
  const { select, item, isChildOfSelected } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const { setDraggableState, setDraggableIdle, draggableState } =
    useDraggableState();

  const [isDragging, setIsDragging] = useAtom(isItemDraggingAtom);
  const showCheckbox = useAtomValue(isMultiSelectModeAtom);

  const { selection, isSelected } = useSelection(selectionAtom);

  React.useEffect(() => {
    const element = ref.current;
    invariant(element, "element should be defined");

    return combine(
      draggable({
        element,
        canDrag: () => {
          if (showCheckbox && !isSelected(item.id)) {
            return false;
          }
          return true;
        },
        getInitialData: () => {
          return item;
        },
        onDragStart: () => {
          if (!showCheckbox) select?.(item.id);
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

          if (isSelected(item.id)) {
            return false;
          }

          return true;
        },
        getData: () => {
          return item;
        },
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
  }, [isSelected, item, setDraggableIdle, setDraggableState, setIsDragging]);

  return (
    <>
      <div
        ref={ref}
        data-id={item.id}
        className={cn(
          "flex h-10 items-center rounded-md border border-transparent px-3 text-sm transition-all ease-out hover:bg-muted",
          isSelected(item.id) && "border-primary bg-secondary font-semibold",
          draggableStateClasses[draggableState.type],
          isSelected(item.id) && isDragging && "opacity-40",
          isChildOfSelected && showCheckbox && "bg-secondary/80",
        )}
        onClick={() => select?.(item.id)}
      >
        <div
          className={cn(
            "flex w-0 shrink-0 items-center overflow-hidden opacity-0 transition-all ease-out",
            showCheckbox && "w-7 opacity-100",
          )}
        >
          <Checkbox checked={isSelected(item.id)} />
        </div>

        <span
          className="mr-2"
          style={{ paddingLeft: `${item.depth * 1.5}rem` }}
        >
          <i
            className="fa-solid fa-file text-lg"
            style={{ color: item.color }}
          />
        </span>

        <span>{item.name}</span>
      </div>
      {draggableState.type === "preview"
        ? createPortal(
            <DriveItemDragOverlay
              itemName={item.name}
              selectionCount={Math.max(selection.size, 1)}
            />,
            draggableState.container,
          )
        : null}
    </>
  );
};

export default DrivePragmaticItem;
