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
import useScrollShadow from "@/hooks/use-scroll-shadow";
import useSelection from "@/hooks/use-selection";
import { IconButton, Tooltip } from "@radix-ui/themes";
import RadixProvider from "@/components/radix-provider";

const DriveDemo: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useAtom(
    isMultiSelectModeAtom,
  );
  const { listRef, isScrolled } = useScrollShadow();
  const { selection, selectLast } = useSelection(selectionAtom);

  return (
    <RadixProvider>
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
              <Tooltip content="Toggle multi-select mode" side="right">
                <IconButton
                  variant={isMultiSelectMode ? "solid" : "soft"}
                  onClick={() => {
                    selectLast();
                    setIsMultiSelectMode((prev) => !prev);
                  }}
                >
                  <i className="fa-solid fa-check-double text-lg" />
                </IconButton>
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
    </RadixProvider>
  );
};

export default DriveDemo;
