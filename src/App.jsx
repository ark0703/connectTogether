import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import { GlobalStateProvider } from "./ThemeMode/GlobalStateContext";

function App() {
  return (
    <>
      <GlobalStateProvider>
        <Navbar />
      </GlobalStateProvider>
    </>
  );
}

export default App;
