// src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import './App.css';
import Cookies from 'js-cookie';
import { useUser } from './userContext';
import { getPostsWithComments } from './services/coffeeApi'
import axios from 'axios';

axios.defaults.withCredentials = true

const App: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const { user, setUser } = useUser()


  useEffect(() => {
    getPostsWithComments().then(posts => setPosts(posts));
  }, [setPosts]);

  useEffect(() => {
    const token = Cookies.get('refreshToken');

    if (token) {
      axios('http://localhost:9000/api/v1/users/details', {
        method: 'GET'
      }).then(({ data }) => {
        console.log(data);

        const user: any = data.payload.user
        setUser(user);
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }, [setUser]);

  const handleLogout = () => {

    setUser(null);
    axios('http://localhost:9000/api/v1/auth/logout', {
      method: 'GET'
    }).then(({ data }) => {
      const user: any = data.payload.user
      setUser(user);
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  const handleEditUser = (name: string, avatarUrl: string) => {
    axios.put('http://localhost:9000/api/v1/users/update', {
      ...user,
      userName: name,
      avatarUrl: avatarUrl
    }).then(({ data }) => {
      debugger
      setUser(data);
    })
  };

  return (
    <Router>
      <Navbar currentUser={user} userAvatar={user?.avatarUrl} onLogout={handleLogout} onEditUser={handleEditUser} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <div className="App">
            {posts.map(post => (
              <Post
                key={post._id}
                id={post._id}
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
                currentUser={user?.userName}
                currentUserAvatar={user?.avatarUrl}
                onCommentChange={() => getPostsWithComments().then(posts => setPosts(posts))}
              />
            ))}
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
