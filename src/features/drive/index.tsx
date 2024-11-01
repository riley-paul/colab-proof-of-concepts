import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import DrivePragmaticItems from "./components/drive-pragmatic/drive-pragmatic-items";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { isMultiSelectModeAtom, selectionAtom } from "./store";
import { Toggle } from "@/components/ui/toggle";
import useScrollShadow from "@/hooks/use-scroll-shadow";
import useSelection from "@/hooks/use-selection";

const DriveDemo: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useAtom(
    isMultiSelectModeAtom,
  );
  const { listRef, isScrolled } = useScrollShadow();
  const { selection, selectLast } = useSelection(selectionAtom);

  return (
    <TooltipProvider>
      <Card>
        <CardHeader
          className={cn(
            "transitional-colors border-b border-transparent ease-in-out",
            isScrolled && "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              <i className="fa-solid fa-hdd mr-3" />
              <span>Drive</span>
            </CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {selection.size} items selected
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <Toggle
                    className="h-8 w-8 p-0"
                    pressed={isMultiSelectMode}
                    onPressedChange={(value) => {
                      selectLast();
                      setIsMultiSelectMode(value);
                    }}
                  >
                    <i className="fa-solid fa-check-double text-lg" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Toggle multi-select mode</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <CardDescription>
            Mockup of Drive using Pragmatic Drag and Drop library. Try dragging
            an item onto another item to change it's parent, or move multiple
            items at a time using multi-select mode.
          </CardDescription>
        </CardHeader>
        <CardContent
          ref={listRef}
          className="grid max-h-[30rem] overflow-auto px-3"
        >
          <DrivePragmaticItems />
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default DriveDemo;
