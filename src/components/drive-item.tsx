import type { Item } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type Props = {
  item: Item;
  isSelected?: boolean;
  showCheckbox?: boolean;
  setIsSelected: (value: boolean) => void;
};

const DriveItem: React.FC<Props> = (props) => {
  const { isSelected, showCheckbox, setIsSelected, item } = props;

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

      <span>{item.name}</span>
    </div>
  );
};

export default DriveItem;
