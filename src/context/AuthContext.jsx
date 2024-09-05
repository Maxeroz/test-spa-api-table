import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuth = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuth(true);
  };

  const handleAuthLogOut = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, isLoading, handleAuth, handleAuthLogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
