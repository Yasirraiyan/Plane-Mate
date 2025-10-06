//import { serialization } from "@tensorflow/tfjs";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
//import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
function Signup() {
  const { Signup, passwordStrength, ValidateSignup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //const [success, setSuccess] = useState(false);
  const [successmsg, setSuccessMsg] = useState({ text: "", color: "black" });
  const navigate = useNavigate();
  const handleSignup = () => {
    const validation = ValidateSignup(
      username,
      password,
      confirmPassword,
      true
    );
    if (!validation.success) {
      setError(validation.message);
      setSuccessMsg({ text: "", color: "black" }); // clear success
      return; // stop here
    }
    Signup(username, password);
    setError("");
    setSuccessMsg({
      text: validation.message + ".Redirect to login page",
      color: "green",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  //Signup using Context and local storage saving

  // alert("Sign up Successfully.");
  //return;

  const strength = passwordStrength(password);
  return (
    <div>
      <h1>Welcome Signup Page</h1>
      <div>
        <label>UserName</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <br />

      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {password && (
          <p style={{ color: strength.color, fontWeight: "bold" }}>
            {strength.text}
          </p>
        )}
      </div>
      <br />
      <br />

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Please Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <br />
      <br />

      {error && (
        <p
          style={{
            color: "red",
            fontFamily: "cursive",
            fontSize: "30px",
            fontWeight: "Bold",
          }}
        >
          {error}
        </p>
      )}
      {successmsg.text && (
        <p
          style={{
            color: successmsg.color,
            fontFamily: "cursive",
            fontSize: "50px",
            fontWeight: "bold",
          }}
        >
          {successmsg.text}
        </p>
      )}
      <p style={{ color: strength.color, fontWeight: "bold" }}>
        {strength.text}
      </p>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
