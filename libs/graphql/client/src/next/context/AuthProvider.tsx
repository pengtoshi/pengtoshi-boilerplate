import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { AuthTokenManager } from "../client";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    const accessToken = cookies.get(AuthTokenManager.authCookieKey.accessToken);
    setIsAuthenticated(!!accessToken);
  }, [cookies]);

  const providerValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
    };
  }, [isAuthenticated]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
