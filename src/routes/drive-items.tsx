import { createFileRoute } from "@tanstack/react-router";
import DriveItems from "@/components/drive-items";

export const Route = createFileRoute("/drive-items")({
  component: DriveItems,
});
