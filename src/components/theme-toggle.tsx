// src/components/ThemeToggle.
"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ text }: { text?: boolean }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={cn("text-primary", {
        "p-0 w-full text-left justify-start": text,
      })}
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="inline dark:hidden" size={24} />
      <Moon className="hidden dark:block" size={18} />
      {text && (
        <>
          <span className={cn("", { "sr-only dark:inline": theme === "dark" })}>
            Light
          </span>
          <span className={cn("", { "sr-only": theme === "light" })}>Dark</span>
        </>
      )}
    </Button>
  );
}