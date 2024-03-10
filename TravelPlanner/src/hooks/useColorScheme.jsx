import { useEffect, useState } from "react";

export function useColorScheme() {
  const [isDark, setIsDark] = useState("");

  useEffect(() => {
    let prefersDark;
    if (localStorage.getItem("isDark") !== null) {

      prefersDark = localStorage.getItem("isDark") === "true";

    } else {
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    }
    setIsDark(prefersDark);

  }, []);




  useEffect(() => {
    if (isDark === "") {
      return;
    }

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("isDark", isDark);
  }, [isDark]);

  return {
    isDark,
    setIsDark,
  };
}