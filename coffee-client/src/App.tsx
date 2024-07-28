// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import './App.css';
import {getPostsWithComments} from './services/coffeeApi'

const App: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>('https://via.placeholder.com/40');

  useEffect(() => {
    getPostsWithComments().then(posts => setPosts(posts));
  }, []);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleEditUser = (name: string, avatarUrl: string) => {
    setCurrentUser(name);
    setUserAvatar(avatarUrl);
  };

  return (
    <Router>
      <Navbar currentUser={currentUser} onLogout={handleLogout} onEditUser={handleEditUser} />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/" element={
          <div className="App">
            {posts.map(post => (
              <Post
                key={post._id}
                name={post.name}
                description={post.description}
                price={post.price}
                region={post.region}
                weight={post.weight}
                flavorProfile={post.flavor_profile}
                grindOption={post.grind_option}
                roastLevel={post.roast_level}
                imageUrl={post.image_url}
                comments={post.comments || []}
                currentUser={currentUser}
                currentUserAvatar={userAvatar}
              />
            ))}
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
