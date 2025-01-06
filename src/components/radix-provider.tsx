import React from "react";
import { Theme } from "@radix-ui/themes";

const RadixProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Theme accentColor="indigo">{children}</Theme>;
};

export default RadixProvider;
