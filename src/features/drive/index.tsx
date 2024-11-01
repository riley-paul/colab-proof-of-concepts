import { TooltipProvider } from "@/components/ui/tooltip";
import React from "react";
import DrivePragmaticItems from "./drive-pragmatic/drive-pragmatic-items";

const DriveDemo: React.FC = () => {
  return (
    <TooltipProvider>
      <DrivePragmaticItems />
    </TooltipProvider>
  );
};

export default DriveDemo;
