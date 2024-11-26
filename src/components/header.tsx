"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { UserButton } from "@/components/user";
import { ToggleTheme } from "@/components/toggle-theme";
import { useState } from "react";
import Image from "next/image";
import { EventStatus } from "@/components/event-status";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NerdIF"
            width={35}
            height={35}
            className="rounded-full"
          />
          <p className="sm:block hidden">NerdIF 2024</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        <EventStatus />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem className="flex items-center gap-2">
          <ToggleTheme />
          <UserButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <UserButton />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ToggleTheme />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export { Header };
