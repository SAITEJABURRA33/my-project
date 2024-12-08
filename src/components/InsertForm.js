import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './formStyles.css';

const InsertForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post('http://localhost:5000/api/add', formData);
      navigate('/');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="insert-form">
        <h2 className="form-title">Registration Form</h2>
        <div className="input-group">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input-field"
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="input-group">
          <input
          type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="input-group">
          <input
          type ="tel"
           pattern="[0-9]{10}"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input-field"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default InsertForm;
