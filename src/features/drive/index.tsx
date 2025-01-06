import React from "react";
import DrivePragmaticItems from "./components/drive-pragmatic/drive-pragmatic-items";

import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { isMultiSelectModeAtom, selectionAtom } from "./store";
import useScrollShadow from "@/hooks/use-scroll-shadow";
import useSelection from "@/hooks/use-selection";
import { Card, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
import RadixProvider from "@/components/radix-provider";

const DriveDemo: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useAtom(
    isMultiSelectModeAtom,
  );
  const { listRef, isScrolled } = useScrollShadow();
  const { selection, selectLast } = useSelection(selectionAtom);

  return (
    <RadixProvider style={{ minHeight: "auto" }}>
      <Card size="3">
        <header
          className={cn(
            "transitional-colors border-b border-transparent ease-in-out",
            isScrolled && "border-border",
          )}
        >
          <div className="flex items-center justify-between">
            <Heading className="text-2xl font-bold">
              <i className="fa-solid fa-hdd mr-3" />
              <span>Drive</span>
            </Heading>
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
          <Text>
            Mockup of Drive using Pragmatic Drag and Drop library. Try dragging
            an item onto another item to change it's parent, or move multiple
            items at a time using multi-select mode.
          </Text>
        </header>
        <div ref={listRef} className="grid max-h-[30rem] overflow-auto px-3">
          <DrivePragmaticItems />
        </div>
      </Card>
    </RadixProvider>
  );
};

export default DriveDemo;
