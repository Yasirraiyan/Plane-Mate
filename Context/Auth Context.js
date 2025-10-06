import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username") || "",
    password: localStorage.getItem("password") || "",
  });
  const Signup = (username, password) => {
    setUser({ username, password });
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };
  const passwordStrength = (password) => {
    if (password.length < 5) return { text: "Weak Password", color: "red" };
    else if (password.length >= 5 && password.length <= 8)
      return { text: "Medium Password", color: "yellow" };
    else return { text: "Strong Password", color: "green" };
  };
  const login = (username, password) => {
    return username === user.username && password === user.password;
  };
  const ValidateSignup = (
    username,
    password,
    confirmPassword,
    isSubmit = false
  ) => {
    if (!username)
      return { success: false, message: "Please fill up username first!" };
    if (!password)
      return { success: false, message: "Please fill up password!" };
    if (!confirmPassword)
      return { success: false, message: "Please confirm your password!" };
    if (password !== confirmPassword)
      return { success: false, message: "Passwords don't match!" };
    if (isSubmit) {
      return { success: true, message: "Password match Successfully" };
    }
    return { success: null, message: "" };
  };
  const ValidateLogin = (username, password) => {
    if (!username && !password)
      return {
        success: false,
        message: "Please fill up both username and password!",
      };
    if (!username)
      return { success: false, message: "Please fill up username first!" };
    if (!password)
      return { success: false, message: "Please fill up password!" };
    if (username === user.username && password === user.password)
      return { success: true, message: "Login Successful" };
    if (username !== user.username && password !== user.password)
      return { success: false, message: "Both Invalid!" };
    if (username !== user.username)
      return { success: false, message: "Invalid username!" };
    if (password !== user.password)
      return { success: false, message: "Invalid password!" };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        Signup,
        login,
        passwordStrength,
        ValidateSignup,
        ValidateLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
