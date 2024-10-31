import React, { useState, useEffect } from "react"; // Import useEffect
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons from Font Awesome
import { useGlobalState } from "./GlobalStateContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useGlobalState();
  // Update the theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Target the <html> tag for theme
  }, [theme]);

  // Toggle between dark mode and light mode

  return (
    <button
      onClick={toggleTheme}
      style={{ display: "flex", alignItems: "center" }}
    >
      {theme != "cupcake" ? (
        <FaSun size={24} color="yellow" />
      ) : (
        <FaMoon size={24} color="black" />
      )}
      <span style={{ marginLeft: "8px" }}>
        {theme != "cupcake" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
