import React from "react";
import DrivePragmaticItems from "./components/drive-pragmatic/drive-pragmatic-items";

import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { isMultiSelectModeAtom, selectionAtom } from "./store";
import useScrollShadow from "@/hooks/use-scroll-shadow";
import useSelection from "@/hooks/use-selection";
import {
  Card,
  Heading,
  IconButton,
  Inset,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import RadixProvider from "@/components/radix-provider";

const DriveDemo: React.FC = () => {
  const [isMultiSelectMode, setIsMultiSelectMode] = useAtom(
    isMultiSelectModeAtom,
  );
  const { listRef, isScrolled } = useScrollShadow();
  const { selection, selectLast } = useSelection(selectionAtom);

  return (
    <RadixProvider style={{ minHeight: "auto" }}>
      <Card size="3" className="max-w-screen-sm">
        <header className={"grid gap-2 pb-12"}>
          <div className="flex items-center justify-between">
            <Heading size="4">
              <i className="fa-solid fa-hdd mr-3" />
              <span>Drive</span>
            </Heading>
            <div className="flex items-center gap-3">
              <Text size="1" color="gray">
                {selection.size} items selected
              </Text>
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
          <Text size="2" color="gray">
            Mockup of Drive using Pragmatic Drag and Drop library. Try dragging
            an item onto another item to change it's parent, or move multiple
            items at a time using multi-select mode.
          </Text>
        </header>
        <Inset ref={listRef} className="grid max-h-[30rem] overflow-auto px-3">
          <DrivePragmaticItems />
        </Inset>
      </Card>
    </RadixProvider>
  );
};

export default DriveDemo;
