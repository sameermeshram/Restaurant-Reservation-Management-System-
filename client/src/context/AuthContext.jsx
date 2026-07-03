import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

const mapUser = (userData) => {
  if (!userData) return null;
  return {
    ...userData,
    isAdmin: userData.role === "admin",
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.getMe();
      setUser(mapUser(response.data.data.user));
    } catch (error) {
      localStorage.removeItem("authToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const payload = response.data.data;
    localStorage.setItem("authToken", payload.accessToken);
    const authenticatedUser = mapUser(payload.user);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    const payload = response.data.data;
    localStorage.setItem("authToken", payload.accessToken);
    const registeredUser = mapUser(payload.user);
    setUser(registeredUser);
    return registeredUser;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
