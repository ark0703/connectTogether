import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value, including all properties
interface GlobalStateContextType {
  theme: string;
  toggleTheme: () => void;
  user: { name: string } | null;
  isAuthenticated: boolean;
  login: (userData: { name: string }) => void;
  logout: () => void;
}

// Provide a default value for the context
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("cupcake");
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "cupcake" ? "synthwave" : "cupcake"
    );
  };

  const login = (userData: { name: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <GlobalStateContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the GlobalStateContext with type safety
export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
