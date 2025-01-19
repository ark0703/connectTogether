import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the type for the context value, including all properties
interface GlobalStateContextType {
  isDark: boolean;
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
  const [isDark, setIsDark] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isDark") ?? "false")
  );
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
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
        isDark,
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
