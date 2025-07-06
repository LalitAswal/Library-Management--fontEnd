import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../Redux/features/action/authAction.js";

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  const [registrationForm, setRegistrationForm] = useState({
    userName: "",
    password: "",
  });

  const { loading, message, status } = useSelector((state) => state.register);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(userRegisterAction(registrationForm));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleRegistration}>
        <label htmlFor="userName" className="auth-label">
          Username:
          <input
            className="auth-input"
            type="text"
            id="userName"
            name="userName"
            value={registrationForm?.userName}
            onChange={handleChange}
          />
        </label>
        {message && <p className="auth-message">{message}</p>}

        <label htmlFor="password" className="auth-label">
          Password:
          <input
            className="auth-input"
            type="password"
            id="password"
            name="password"
            value={registrationForm?.password}
            onChange={handleChange}
          />
        </label>

        <button className="auth-button" type="submit">
          Submit
        </button>
        <a className="auth-link" href="/">
          Login
        </a>
      </form>
    </>
  );
};
