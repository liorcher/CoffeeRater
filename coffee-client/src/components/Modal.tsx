// src/components/Modal.tsx

import React, { useState } from 'react';
import './Modal.css';
import { User } from '../userContext';
import { uploadImage } from '../services/authFetchApi';

interface ModalProps {
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, avatarUrl: string) => void;
}

const Modal: React.FC<ModalProps> = ({ currentUser, isOpen, onClose, onSave }) => {
  const [name, setName] = useState((() => currentUser?.userName));
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!name || !file) {
      return
    }

    const photoFormData = new FormData();
    photoFormData.append('image', file);

    const avatarUrl = await uploadImage(photoFormData)

    onSave(name, avatarUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit User</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Avatar:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
