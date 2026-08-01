"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className="size-10 rounded-xl border border-border bg-card"
        aria-hidden="true"
      />
    );
  }

  const ActiveIcon =
    themes.find((item) => item.value === theme)?.icon ??
    (resolvedTheme === "dark" ? Moon : Sun);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground",
          "transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label="Tema değiştir"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <ActiveIcon className="size-[18px]" aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="listbox"
            aria-label="Tema seçenekleri"
            className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-border bg-card p-1 shadow-elevated"
          >
            {themes.map(({ value, label, icon: Icon }) => (
              <li key={value} role="option" aria-selected={theme === value}>
                <button
                  type="button"
                  onClick={() => {
                    setTheme(value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    theme === value
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-background",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
