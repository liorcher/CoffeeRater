// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import './App.css';
import { useUser } from './userContext';
import {getPostsWithComments} from './services/coffeeApi'

const App: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const {user, setUser} = useUser()


  useEffect(() => {
    getPostsWithComments().then(posts => setPosts(posts));
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const handleEditUser = (name: string, avatarUrl: string) => {
    setUser({
      username: name, avatar: avatarUrl
    })
  };

  return (
    <Router>
      <Navbar currentUser={user?.username} onLogout={handleLogout} onEditUser={handleEditUser} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
                currentUser={user?.username}
                currentUserAvatar={user?.avatar}
              />
            ))}
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
