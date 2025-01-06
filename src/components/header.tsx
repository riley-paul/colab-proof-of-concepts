import { cn } from "@/lib/utils";
import { Button, TabNav } from "@radix-ui/themes";
import React from "react";

type Link = {
  href: string;
  text: string;
  icon: string;
};

const links: Link[] = [
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
  {
    href: "/badges",
    text: "File Overlay",
    icon: "fa-solid fa-file",
  },
  {
    href: "/scroll-shadow",
    text: "Scroll Shadow",
    icon: "fa-solid fa-scroll",
  },
];

const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <header className="flex w-full items-center justify-between border-b px-4">
      <TabNav.Root>
        {links.map((link) => (
          <TabNav.Link href={link.href} active={link.href === pathname}>
            <i className={cn("text-gray-11 mr-3", link.icon)} />
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
