import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle, signUp } from '../services/authFetchApi'
import { useUser } from '../userContext';

import './LoginPage.css'

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle sign-up logic here
      signUp(username, photo, password, email).then(() => {
        login(username, password).then((response) => {
          setUser({
            username: response.userName,
            avatar: response.avatarUrl
          })
          navigate('/')
        });
      })
      console.log('Sign up with:', { username, password, email, photo });
    } else {
      login(username, password).then((response) => {
        setUser({
          username: response.userName,
          avatar: response.avatarUrl
        })
        debugger
        navigate('/')
      });
      console.log('Sign in with:', { username, password });
    }
    navigate('/');
  };

  const handleGoogleSignIn = () => {
    loginWithGoogle().then(() => navigate('/'))
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
                onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
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
