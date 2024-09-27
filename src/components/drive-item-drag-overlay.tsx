import React from "react";

type Props = { itemName: string; selectionCount: number };

const DriveItemDragOverlay: React.FC<Props> = (props) => {
  const { itemName, selectionCount } = props;

  return (
    <div className="relative">
      <div className="z-10 flex h-10 min-w-32 max-w-60 items-center gap-2 rounded border bg-card px-2 text-sm font-medium">
        <i className="fa-solid fa-file text-lg shrink-0 w-4 text-center" />
        <span className="truncate">{itemName}</span>
        <span className="flex flex-1 justify-end">
          <div className="flex size-5 items-center justify-center rounded-full bg-primary">
            {selectionCount}
          </div>
        </span>
      </div>
      {selectionCount > 1 && (
        <div className="absolute -bottom-1 -right-1 -z-10 flex h-10 w-full items-center rounded border bg-card px-2 text-sm font-medium"></div>
      )}
    </div>
  );
};

export default DriveItemDragOverlay;
