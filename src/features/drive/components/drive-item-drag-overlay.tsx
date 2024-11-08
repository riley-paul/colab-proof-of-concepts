import { Badge } from "@/components/ui/badge";
import React from "react";

const DriveItemDragOverlay: React.FC<{
  itemName: string;
  selectionCount: number;
}> = ({ itemName, selectionCount }) => {
  return (
    <div className="relative">
      <div className="z-10 flex h-10 min-w-32 max-w-60 items-center gap-2 rounded-md border bg-card px-2 text-sm font-medium">
        <i className="fa-solid fa-file w-4 shrink-0 text-center text-lg text-muted-foreground" />
        <span className="truncate">{itemName}</span>
        <span className="flex flex-1 justify-end">
          <Badge className="rounded-full px-2">{selectionCount}</Badge>
        </span>
      </div>
      {selectionCount > 1 && (
        <div className="absolute -bottom-1 -right-1 -z-10 h-10 w-full rounded border bg-card" />
      )}
    </div>
  );
};

export default DriveItemDragOverlay;
