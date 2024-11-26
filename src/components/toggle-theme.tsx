"use client"

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Check, LaptopMinimal, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="flat" className="w-full">
          {theme === "light" && <Sun className="size-4" />}
          {theme === "dark" && <Moon className="size-4" />}
          {theme === "system" && <LaptopMinimal className="size-4" />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>
          <Button
            className="w-full flex items-center gap-2 justify-between"
            onClick={() => setTheme("light")}
          >
            <div className="flex items-center gap-2">
              <Sun className="size-4" />
              Claro
            </div>
            {theme === "light" && <Check className="size-4" />}
          </Button>
        </DropdownItem>
        <DropdownItem>
          <Button
            className="w-full flex items-center gap-2 justify-between"
            onClick={() => setTheme("dark")}
          >
            <div className="flex items-center gap-2">
              <Moon className="size-4" />
              Escuro
            </div>
            {theme === "dark" && <Check className="size-4" />}
          </Button>
        </DropdownItem>
        <DropdownItem>
          <Button
            className="w-full flex items-center gap-2 justify-between"
            onClick={() => setTheme("system")}
          >
            <div className="flex items-center gap-2">
              <LaptopMinimal className="size-4" />
              Sistema
            </div>
            {theme === "system" && <Check className="size-4" />}
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export { ToggleTheme };
