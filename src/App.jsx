import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";

function App() {
  const [theme, setTheme] = useState("cupcake");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Update state and trigger useEffect to change the theme
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Target the <html> tag
  }, [theme]);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
