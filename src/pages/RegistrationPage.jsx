import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../Redux/features/action/authAction.js';
import './LoginPage.css'; // Reuse the same CSS

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  const [registrationForm, setRegistrationForm] = useState({
    userName: '',
    password: '',
  });

  const { loading, message } = useSelector((state) => state.register);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await dispatch(userRegisterAction(registrationForm));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="library-login-container">
      <div className="library-login-card">
        <h2 className="library-login-title">📚 Library Registration</h2>
        <form className="auth-form" onSubmit={handleRegistration}>
          <label htmlFor="userName" className="auth-label">
            Create username:
            <input
              className="auth-input"
              type="text"
              id="userName"
              name="userName"
              value={registrationForm.userName}
              onChange={handleChange}
              required
              placeholder="Choose a unique username"
            />
          </label>

          {message && <p className="auth-message">{message}</p>}

          <label htmlFor="password" className="auth-label">
            Create Password:
            <input
              className="auth-input"
              type="password"
              id="password"
              name="password"
              value={registrationForm.password}
              onChange={handleChange}
              required
              placeholder="Choose a strong password"
            />
          </label>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <a className="auth-link" href="/">
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
};
