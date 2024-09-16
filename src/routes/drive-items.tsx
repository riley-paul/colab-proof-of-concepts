import DriveItem from "@/components/drive-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import useScrollShadow from "@/hooks/use-scroll-shadow";
import { buildTree, flattenTree, generateItems } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import React from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { ItemSchema } from "@/lib/types";
import { flushSync } from "react-dom";

const Component: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const [selection, setSelection] = React.useState<Set<string>>(new Set());

  const [items, setItems] = React.useState(() => generateItems(50));

  const { listRef, isScrolled } = useScrollShadow();

  const flatItems = React.useMemo(() => {
    const tree = buildTree(items);
    const flatItems = flattenTree(tree);
    return flatItems;
  }, [items]);

  React.useEffect(() => {
    return monitorForElements({
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = ItemSchema.safeParse(source.data);
        const targetData = ItemSchema.safeParse(target.data);

        if (!targetData.success || !sourceData.success) return;

        const parentId = targetData.data.id;
        const sourceId = sourceData.data.id;

        flushSync(() => {
          console.log("updating items");
          setItems((prev) =>
            prev.map((item) =>
              selection.has(item.id) || sourceId === item.id
                ? { ...item, parentId }
                : item,
            ),
          );
        });

        const element = document.querySelector(`[data-id="${sourceId}"]`);
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      },
    });
  }, [selection]);

  return (
    <Card className="w-full max-w-screen-sm p-0">
      <CardHeader className={cn("transitional-all", isScrolled && "border-b")}>
        <div className="flex items-center justify-between">
          <CardTitle>Drive Items</CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {selection.size} items selected
            </span>
            <Toggle
              className="h-8 w-8 p-0"
              variant="outline"
              pressed={isMultiSelectMode}
              onPressedChange={(value) => {
                setSelection(new Set());
                setIsMultiSelectMode(value);
              }}
            >
              <Check size="1rem" />
            </Toggle>
          </div>
        </div>
      </CardHeader>
      <CardContent ref={listRef} className="grid max-h-[30rem] overflow-auto">
        {flatItems.map((item) => (
          <DriveItem
            key={item.id}
            item={item}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            selectedItemIds={selection}
            showCheckbox={isMultiSelectMode}
            isSelected={selection.has(item.id)}
            setIsSelected={(value) =>
              value
                ? setSelection((prev) => new Set(prev).add(item.id))
                : setSelection((prev) => {
                    const next = new Set(prev);
                    next.delete(item.id);
                    return next;
                  })
            }
          />
        ))}
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute("/drive-items")({
  component: Component,
});
