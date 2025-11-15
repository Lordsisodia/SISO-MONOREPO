"use client";

import { useState, useRef, useEffect } from "react";
import Switch from "@/components/ui/sky-toggle";

interface ThemeToggleProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeToggle({ currentTheme, onThemeChange }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Sync the checkbox state with the current theme
  useEffect(() => {
    if (checkboxRef.current) {
      if (currentTheme === "dark") {
        checkboxRef.current.checked = true;
        setIsDark(true);
      } else {
        checkboxRef.current.checked = false;
        setIsDark(false);
      }
    }
  }, [currentTheme]);

  const handleToggle = () => {
    // Toggle between light and dark
    const newTheme = isDark ? "light" : "dark";
    onThemeChange(newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Switch />
        <div className="flex flex-col">
          <span className="text-xs text-siso-text-primary font-medium">
            Theme
          </span>
          <span className="text-[10px] text-siso-text-muted">
            {currentTheme === "system"
              ? "Following system preference"
              : `${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} mode`
            }
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onThemeChange("system")}
          className={`px-2 py-1 text-[10px] rounded transition ${
            currentTheme === "system"
              ? "bg-siso-orange/20 text-siso-orange border border-siso-orange/40"
              : "text-siso-text-muted hover:text-siso-text-primary border border-transparent"
          }`}
        >
          Auto
        </button>
        <button
          type="button"
          onClick={handleToggle}
          className={`px-2 py-1 text-[10px] rounded transition ${
            currentTheme !== "system"
              ? "bg-siso-orange/20 text-siso-orange border border-siso-orange/40"
              : "text-siso-text-muted hover:text-siso-text-primary border border-transparent"
          }`}
        >
          {isDark ? "Dark" : "Light"}
        </button>
      </div>
    </div>
  );
}