import { createContext, useState } from "react";
import { useEffect } from "react";
import { getProfile, refreshAccessToken } from "../services/auth.service";
import { updateAccessToken } from "../api/axios";

import { logoutUser } from "../services/auth.service";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (userData, token) => {
    setUser(userData);

    setAccessToken(token);

    updateAccessToken(token);
  };

  const logout = async () => {
    if (user) {
      try {
        await logoutUser();
      } catch (error) {
        console.log(error);
      }
    }

    setUser(null);
    setAccessToken(null);
    updateAccessToken(null);
  };

  const checkAuth = async () => {
    try {
      const refreshResponse = await refreshAccessToken();

      updateAccessToken(refreshResponse.accessToken);

      const profileResponse = await getProfile();

      login(profileResponse.data, refreshResponse.accessToken);
    } catch (error) {
      setUser(null);
      setAccessToken(null);
      updateAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    accessToken,
    loading,
    setLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
