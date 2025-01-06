import ScrollShadows from "@/components/scroll-shadows";
import { cn } from "@/lib/utils";
import { Card, Inset, Switch, Text } from "@radix-ui/themes";
import React from "react";

const ScrollShadowDemo: React.FC = () => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);

  const items = Array.from({ length: isOverflowing ? 100 : 10 }, (_, i) => i);

  return (
    <div className="grid w-full max-w-screen-sm gap-2">
      <Text
        as="label"
        className="flex items-center gap-2"
        size="2"
        weight="medium"
      >
        <Switch checked={isOverflowing} onCheckedChange={setIsOverflowing} />
        Overflowing list
      </Text>
      <Card className="relative">
        <ScrollShadows containerRef={listRef} />
        <Inset ref={listRef} className={cn("h-[40rem] overflow-auto")}>
          <div className="mx-auto w-full">
            {items.map((item) => (
              <div
                key={item}
                className="hover:bg-gray-2 px-4 py-1 text-sm transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </Inset>
      </Card>
    </div>
  );
};

export default ScrollShadowDemo;
