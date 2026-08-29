import { createContext } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import api from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],

    queryFn: async () => {
      const response = await api.get("/api/auth/me");

      return response.data.user;
    },

    retry: false,
  });


  const user = data || null;


  const logout = async () => {

    try {

      await api.post("/api/auth/logout");

      queryClient.setQueryData(
        ["currentUser"],
        null
      );

      queryClient.removeQueries({
        queryKey: ["currentUser"],
      });

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

    }

  };


  const checkAuth = async () => {
    await refetch();
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading: isLoading,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};