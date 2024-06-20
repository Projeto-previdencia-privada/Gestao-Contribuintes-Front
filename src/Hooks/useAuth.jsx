import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const userStorage = localStorage.getItem("users_db");

    if (userToken && userStorage) {
      const hasUser = JSON.parse(userStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser.length) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, password) => {
    if (!email || !password) {
      return "Preencha todos os campos";
    }

    const userStorage = JSON.parse(localStorage.getItem("users_db")) || [];

    const hasUser = userStorage.filter((user) => user.email === email);

    if (hasUser.length) {
      if (hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, token });

        return null; // Retorno nulo para indicar sucesso
      } else {
        return "Email ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email, password) => {
    const userStorage = JSON.parse(localStorage.getItem("users_db")) || [];

    const hasUser = userStorage.filter((user) => user.email === email);

    if (hasUser.length) {
      return "Já existe uma conta com esse email";
    }

    const newUser = [...userStorage, { email, password }];

    localStorage.setItem("users_db", JSON.stringify(newUser));
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  const resetPassword = (email, newPassword) => {
    const storedUsers = JSON.parse(localStorage.getItem("users_db")) || [];
    const userIndex = storedUsers.findIndex((user) => user.email === email);

    if (userIndex === -1) {
      return "Email não encontrado";
    }

    storedUsers[userIndex].password = newPassword;
    localStorage.setItem("users_db", JSON.stringify(storedUsers));
    return null;
  };

  return { user, signed: !!user, signin, signup, signout, resetPassword };
};

export default useAuth;
