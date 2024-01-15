import React from "react";
import { LoginParam, User } from "../types/User";
import { signIn } from "../api/auth";

const key = "curso_react_user";

type AuthContext = {
  login: (param: LoginParam) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  register: (u: User) => void;
  getUser: () => User | null;
};

const AuthContext = React.createContext<AuthContext>(
  null as unknown as AuthContext
);

export default AuthContext;

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState<User | null>(() => {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : null
  });

  function isAuthenticated() {
    return !!user;
  }

  async function login(params: LoginParam) {
    const userOrError = signIn(params);
    if (userOrError instanceof Error) {
      alert(userOrError.message);
      return;
    }
    setUser(await userOrError);
  }

  function register(params: User) {
    fetch('http://localhost:8080/cliente', {
      method: 'POST', 
      mode: 'cors', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    })
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(key);
  }

  function getUser() {
    return user;
  }

  React.useEffect(() => {
    if (!user) return;
    localStorage.setItem(key, JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        register,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
