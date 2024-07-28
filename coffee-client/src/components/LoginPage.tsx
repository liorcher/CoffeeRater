import React, { useState } from 'react';
import './LoginPage.css';
import {signUp, login, loginWithGoogle} from '../services/authFetchApi'

interface LoginPageProps {
  onLogin: (username: string, avatarUrl: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/40');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signUp(username, avatarUrl, password, email)
      // handle sign up logic
      onLogin(username, avatarUrl);
    } else {
      login(username, password)
      onLogin(username, avatarUrl);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {isSignUp && (
          <>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <img src={avatarUrl} alt="Avatar Preview" className="avatar-preview" />
          </>
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        <p onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
