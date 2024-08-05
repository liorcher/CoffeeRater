import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle, signUp } from '../services/authFetchApi'

import './LoginPage.css'

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const photoFormData = new FormData();
    photoFormData.append('image', file);

    if (isSignUp) {
      signUp(username, photoFormData, password, email).then(() => navigate('/'))
    } else {
      login(username, password).then(() => navigate('/'))
    }

  };

  const handleGoogleSignIn = () => {
    loginWithGoogle()
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <button className="google-login-button" onClick={handleGoogleSignIn}>
          Login with Google
        </button>
        <form onSubmit={handleSubmit} className='login-form '>
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </>
          )}
          {!isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <p onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
