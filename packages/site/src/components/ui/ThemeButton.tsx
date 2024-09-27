"use client";

import { useEffect, useState } from "react";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeButton(props: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      className={props.className}
      aria-label="Change color scheme"
      onClick={() =>
        setTheme(
          theme === "dark" ? "system" : theme === "light" ? "dark" : "light",
        )
      }
    >
      {mounted ? (
        <>
          {theme === "dark" ? (
            <Moon height={24} width={24} />
          ) : theme === "light" ? (
            <Sun height={24} width={24} />
          ) : (
            <SunMoon height={24} width={24} />
          )}
        </>
      ) : (
        <span className="h-[24px] w-[24px] inline-block" />
      )}
    </button>
  );
}
