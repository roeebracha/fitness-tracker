import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";
import { tokenStorage } from "./tokenStorage";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      if (!tokenStorage.get()) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        if (error.response?.status === 401) tokenStorage.clear();
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function loginWithGoogle(credential) {
    const response = await api.post("/auth/google", { credential });
    const { token, user } = response.data;

    tokenStorage.set(token);
    setUser(user);
    toast.success(`ברוך הבא ${response.data.user.name}`);
  }

  async function registerWithEmail({username, email, password, fullName}) {
    try{
    const {data} = await api.post("/auth/register", {
      username,
      email,
      password,
      fullName,
    });

    tokenStorage.set(data.token);

    setUser(data.token);
    toast.success(`ברוך הבא ${data.user.name}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "ההרשמה נכשלה");
    }
  }

 async function loginWithEmail({username, password}) {
    try{
    const {data} = await api.post("/auth/login", {
      username,
      password,
    });

    tokenStorage.set(data.token);
    setUser(data.token);
    toast.success(`ברוך הבא ${data.user.name}`);
    } catch(error){
      toast.error(error.response?.data?.message || "ההרשמה נכשלה");
    }
  }

  function logout() {
    tokenStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
