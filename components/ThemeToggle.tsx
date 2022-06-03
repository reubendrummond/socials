import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDark ? "dark" : "light");
  }, [setTheme]);

  const handleToggle = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return isMounted ? (
    <button onClick={handleToggle} className="w-[32px]">
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  ) : (
    <></>
  );
};

export default ThemeToggle;
