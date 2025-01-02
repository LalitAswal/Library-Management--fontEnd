import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../features/action/authAction";

const LoginPage = () => {
  console.log("checking login page");

  // State to manage form inputs
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });

  const dispatch = useDispatch();
  console.log("checking dispatch ", dispatch);

  // Using the correct selector to access login state
  const { loading, message, status } = useSelector((state) => state.login);

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(userLoginAction(loginForm));

      console.log("checking login result", result);
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
