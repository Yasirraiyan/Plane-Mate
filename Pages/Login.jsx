import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Login() {
  const { ValidateLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successmsg, setSuccessMsg] = useState({ text: "", color: "black" });
  const navigate = useNavigate();
  //const storedUsername = localStorage.getItem("username");
  //const storedPassword = localStorage.getItem("password");

  const handleLogin = () => {
    //use login from auth context
    const validation = ValidateLogin(username, password); //return{success,msg}
    if (validation.success) {
      alert("Login Successful");
      //setError(isloginSuccessful.message);
      setError("");
      setSuccessMsg({ text: validation.message, color: "green" });
      setTimeout(() => navigate("/home"), 1000);
      return;
    } else {
      setError(validation.message || "Invalid username or password!");
      setSuccessMsg({ text: "", color: "red" });
    }
  };
  return (
    <div>
      <h1>Welcome Login Page</h1>
      <div>
        <label>UserName:</label>
        <input
          type="text"
          placeholder="Enter your username "
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            const newPassword = e.target.value;
            setPassword(newPassword);
          }}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      {successmsg.text && (
        <p
          style={{
            color: successmsg.color,
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "cursive",
          }}
        >
          {successmsg.text}
        </p>
      )}
      <p
        style={{
          color: "red",
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "cursive",
        }}
      >
        {error}
      </p>
    </div>
  );
}

export default Login;
