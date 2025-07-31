import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../Redux/features/action/authAction';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from '../constant/numberConstants';
// import FacebookLogin from 'react-facebook-login';
import './LoginPage.css';
import axiosClient from '../services/axios';

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

  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;
    console.log('credential', credential);
    try {
      const res = await axiosClient.post('/user/google-login', {
        token: credential,
      });

      const data = res?.data;
      console.log('checking data', data);
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userName', data.userName);
        sessionStorage.setItem('role', data?.role);
        sessionStorage.setItem('id', data?.id);
      }
      navigate('/Books_List');
    } catch (err) {
      console.error('Google login failed', err.response?.data || err.message);
    }
  };

  // const handleFacebookLogin = async (response) => {
  //   const accessToken = response?.accessToken;
  //   try {
  //     const res = await fetch('https://localhost:8000/api/auth/facebook-login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ accessToken }),
  //     });
  //     const data = await res.json();
  //     if (data.token) {
  //       sessionStorage.setItem('token', data.token);
  //       sessionStorage.setItem('userName', data.user.userName);
  //       navigate('/Books_List');
  //     }
  //   } catch (err) {
  //     console.log('Facebook login failed', err);
  //   }
  // };

  return (
    <div className="library-login-container">
      <div className="library-login-card">
        <h2 className="library-login-title">📚 Library Management System</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <label className="auth-label">
            Username:
            <input
              className="auth-input"
              type="text"
              name="userName"
              value={loginForm.userName}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </label>

          {message && <span className="auth-message">{message}</span>}

          <label className="auth-label">
            Password:
            <input
              className="auth-input"
              type="password"
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

        <div className="social-login-buttons">
          <GoogleOAuthProvider clientId={googleClientId}>
            {console.log('googleClientId', googleClientId)}
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log('Google login failed')}
              className="google-login-buttons"
            />
          </GoogleOAuthProvider>

          {/* <FacebookLogin
            appId=""
            onSuccess={handleFacebookLogin}
            onError={() => console.log('Facebook login failed')}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
