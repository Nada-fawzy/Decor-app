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
    <div className="modal w-100 p-3 ">
      <div className="modal-content w-50">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input className='form-control' type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className='form-control' type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className='form-control' type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div style={{display:'flex',flexDirection: 'row' ,alignItems: 'center', justifyContent: 'center'}}>
          <button type="submit" className='btn btn-success w-25'>Save</button>
          <button type="button" className='btn btn-danger w-25' onClick={closeModal}>Cancel</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default UserForm;
