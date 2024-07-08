import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../services/ProfileService';

const UserForm = ({ closeModal, userId, setUser }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    getUserProfile(userId).then(response => {
      setFormData(response.data);
    });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(userId, formData).then(response => {
      setUser(response.data);
      closeModal();
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
