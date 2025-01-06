import React from "react";
import { Theme, type ThemeProps } from "@radix-ui/themes";

const RadixProvider: React.FC<ThemeProps> = ({ children, ...props }) => {
  return (
    <Theme accentColor="indigo" {...props}>
      {children}
    </Theme>
  );
};

export default RadixProvider;
