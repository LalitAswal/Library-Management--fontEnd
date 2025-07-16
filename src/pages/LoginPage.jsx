import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../Redux/features/action/authAction';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({
    userName: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message } = useSelector((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(userLoginAction(loginForm));
      const token = result?.payload.token;
      const userName = result?.payload.userName;
      const decodedToken = jwtDecode(token);
      sessionStorage.setItem('id', decodedToken.id);
      sessionStorage.setItem('role', decodedToken.role);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userName', userName);
      navigate('/Books_List');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="library-login-container">
      <div className="library-login-card">
        <h2 className="library-login-title">📚 Library Management System</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <label htmlFor="userName" className="auth-label">
            username:
            <input
              className="auth-input"
              type="text"
              id="userName"
              name="userName"
              value={loginForm.userName}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </label>

          {message && <span className="auth-message">{message}</span>}

          <label htmlFor="password" className="auth-label">
            Password:
            <input
              className="auth-input"
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </label>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <a className="auth-link" href="/register">
            Not registered? Create an account
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
