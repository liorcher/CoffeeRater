// src/components/Navbar.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Modal from './Modal';

interface NavbarProps {
  currentUser: string | undefined;
  onLogout: () => void;
  onEditUser: (name: string, avatarUrl: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout, onEditUser }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const openModal = () => {
    setShowMenu(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (name: string, avatarUrl: string) => {
    onEditUser(name, avatarUrl);
    closeModal();
  };

  const handleMenuClick = (action: string) => {
    if (action === 'Edit User') {
      openModal();
    } else if (action === 'Logout') {
      onLogout();
      navigate('/');
    }
    setShowMenu(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Coffee Rater</h1>
        </div>
        <div className="navbar-right">
          {currentUser ? (
            <>
              <button className="avatar-button" onClick={toggleMenu}>
                <img src="https://via.placeholder.com/40" alt="User Avatar" />
              </button>
              {showMenu && (
                <div className="dropdown-menu">
                  <button onClick={() => handleMenuClick('Edit User')}>Edit User</button>
                  <button onClick={() => handleMenuClick('Logout')}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          )}
        </div>
      </nav>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
    </>
  );
};

export default Navbar;
