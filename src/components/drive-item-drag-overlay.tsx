import { File } from "lucide-react";
import React from "react";

type Props = { itemName: string; selectionCount: number };

const DriveItemDragOverlay: React.FC<Props> = (props) => {
  const { itemName, selectionCount } = props;

  return (
    <div className="relative">
      <div className="z-10 flex h-10 min-w-32 items-center rounded border bg-card px-2 text-sm font-medium">
        <File className="mr-2 size-5" />
        <span>{itemName}</span>
        <span className="flex flex-1 justify-end">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary">
            {selectionCount}
          </div>
        </span>
      </div>
      {selectionCount > 1 && (
        <div className="absolute -bottom-1 -right-1 -z-10 flex h-10 w-32 items-center rounded border bg-card px-2 text-sm font-medium"></div>
      )}
    </div>
  );
};

export default DriveItemDragOverlay;
