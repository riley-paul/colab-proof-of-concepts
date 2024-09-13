import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import useScrollShadow from "@/hooks/use-scroll-shadow";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import React from "react";

const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

type ItemProps = {
  label: string;
  showCheckbox?: boolean;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
};

const Item: React.FC<ItemProps> = (props) => {
  const { label, showCheckbox, isSelected, setIsSelected } = props;
  return (
    <div
      className={cn(
        "flex items-center text-sm h-10 hover:bg-muted px-3 border-l-4 border-transparent rounded transition-colors ease-out",
        isSelected && "border-primary bg-secondary font-semibold rounded-l-none"
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
          onCheckedChange={(value) => setIsSelected(Boolean(value))}
        />
      </div>

      <span>{label}</span>
    </div>
  );
};

const Component: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = React.useState(false);
  const [selection, setSelection] = React.useState<Set<string>>(new Set());

  const { listRef, isScrolled } = useScrollShadow();

  return (
    <Card className="max-w-screen-sm w-full p-0">
      <CardHeader className={cn("transitional-all", isScrolled && "border-b")}>
        <div className="flex items-center justify-between">
          <CardTitle>Drive Items</CardTitle>
          <div className="flex gap-3 items-center">
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
        {items.map((item) => (
          <Item
            key={item}
            label={item}
            showCheckbox={isMultiSelectMode}
            isSelected={selection.has(item)}
            setIsSelected={(value) =>
              value
                ? setSelection((prev) => new Set(prev).add(item))
                : setSelection((prev) => {
                    const next = new Set(prev);
                    next.delete(item);
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
