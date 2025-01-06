import { Badge, Text } from "@radix-ui/themes";
import React from "react";

const DriveItemDragOverlay: React.FC<{
  itemName: string;
  selectionCount: number;
}> = ({ itemName, selectionCount }) => {
  return (
    <div className="relative z-[200]">
      <div className="rounded-2 bg-panel-solid flex h-10 z-10 min-w-32 max-w-60 items-center gap-2 border px-2">
        <i className="fa-solid fa-file text-accent-10 w-4 shrink-0 text-center" />
        <Text truncate weight="medium" size="2">
          {itemName}
        </Text>
        <span className="flex flex-1 justify-end">
          <Badge radius="full">{selectionCount}</Badge>
        </span>
      </div>
      {selectionCount > 1 && (
        <div className="rounded-2 bg-gray-2 -z-10 absolute -bottom-1 -right-1 h-10 w-full border" />
      )}
    </div>
  );
};

export default DriveItemDragOverlay;
