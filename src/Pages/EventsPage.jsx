import React from "react";
import Navbar from "../Navbar/Navbar";
import { GlobalStateProvider } from "../ThemeMode/GlobalStateContext";

const EventsPage = () => {
  return (
    <GlobalStateProvider>
      <Navbar />
    </GlobalStateProvider>
  );
};

export default EventsPage;
