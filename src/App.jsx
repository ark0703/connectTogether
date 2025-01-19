import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import EventsPage from "./Pages/EventsPage";
import AuthPage from "./Pages/AuthPage";
import Form from "./Components/Form/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Form" replace />} />

        <Route path="/signin" element={<Form />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute isAuth={true}>
              <EventsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
