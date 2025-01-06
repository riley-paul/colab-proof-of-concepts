import { cn } from "@/lib/utils";
import { Button, TabNav } from "@radix-ui/themes";
import React from "react";

const links = [
  {
    href: "/",
    text: "Home",
    icon: "fa-solid fa-home",
  },
  {
    href: "/drive",
    text: "Drive",
    icon: "fa-solid fa-hdd",
  },
];

const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <header className="flex w-full items-center justify-between px-4 border-b">
      <TabNav.Root>
        {links.map((link) => (
          <TabNav.Link href={link.href} active={link.href === pathname}>
            <i className={cn("mr-3", link.icon)} />
            {link.text}
          </TabNav.Link>
        ))}
      </TabNav.Root>
      <Button asChild className="font-mono" size="1" variant="ghost">
        <a
          href="https://github.com/rjp301/colab-proof-of-concepts"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fa-brands fa-github"></i>
          <span>GitHub</span>
        </a>
      </Button>
    </header>
  );
};

export default Header;
