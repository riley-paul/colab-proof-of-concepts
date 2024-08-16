import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import React from "react";

const items = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
];

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
        "flex items-center text-sm h-9 hover:bg-secondary px-2 border-l-4 border-transparent rounded",
        showCheckbox && isSelected && "border-primary bg-secondary font-semibold rounded-l-none"
      )}
    >
      <div
        className={cn(
          "opacity-0 w-0 overflow-hidden ease-in-out flex items-center",
          showCheckbox && "opacity-100 w-8"
        )}
        style={{
          transition: `opacity 0.15s ${showCheckbox ? "0.1s" : ""}, width 0.15s ${showCheckbox ? "" : "0.1s"}`,
        }}
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

  return (
    <Card className="h-1/2 max-w-xl w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Checkbox Animation</CardTitle>
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
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
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
        </div>
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute("/checkbox-animation")({
  component: Component,
});
