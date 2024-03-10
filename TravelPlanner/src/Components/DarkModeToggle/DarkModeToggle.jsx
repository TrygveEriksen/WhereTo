import React from "react";
import { useColorScheme } from "../../hooks/useColorScheme";
import "./DarkModeToggle.css";

export const DarkModeToggle = () => {
  const { isDark, setIsDark } = useColorScheme();
  return (
    <label className="toggleSlider">

        <input type="checkbox"
          checked={isDark}
          onChange={({ target }) => setIsDark(target.checked)}
        />
        <span className="slider"></span>
    </label>
  );
};