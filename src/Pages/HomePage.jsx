import React from "react";
import Navbar from "../Navbar/Navbar";
import { GlobalStateProvider } from "../ThemeMode/GlobalStateContext";
import Difference from "../DiffComp/Difference";

const HomePage = () => {
  return (
    <>
      <GlobalStateProvider>
        <Navbar />
      </GlobalStateProvider>
    </>
  );
};

export default HomePage;
