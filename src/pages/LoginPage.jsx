import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../Redux/features/action/authAction.js";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

  // State to manage form inputs
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Using the correct selector to access login state
  const { loading, message, status } = useSelector((state) => state.login);

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(userLoginAction(loginForm));
      const token = result?.payload["data"].token;
      const decodedToken =await jwtDecode(token);
      sessionStorage.setItem("id", decodedToken.id);
      sessionStorage.setItem("role", decodedToken.role);
      sessionStorage.setItem("token", token);
      navigate("/BooksList")


    } catch (error) {
      console.log("error", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="userName">
          User Name:
          <input
            type="text"
            id="userName"
            name="userName"
            value={loginForm?.userName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm?.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
        <br />
        <a href="/register">Registration</a>
      </form>

      {message && <p>{message}</p>}
    </>
  );
};

export default LoginPage;
