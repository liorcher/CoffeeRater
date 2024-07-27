// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic here
      onLogin(email);
    } else {
      // Handle sign-up logic here
      onLogin(username);
    }
    navigate('/');
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login here
    console.log(`Logging in with ${provider}`);
    onLogin(provider);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </label>
          )}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <div className="social-login">
          <button onClick={() => handleSocialLogin('Facebook')} className="facebook-button">
            Login with Facebook
          </button>
          <button onClick={() => handleSocialLogin('Google')} className="google-button">
            Login with Google
          </button>
        </div>
        <div className="toggle-link">
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
