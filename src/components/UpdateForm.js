import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './formStyles2.css';

const UpdateForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/update/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="update-form">
        <h2 className="form-title">Update Data</h2>
        <div className="form-input-group">
          <input
            className="form-input"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div className="form-input-group">
          <input
            className="form-input"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="form-error">{errors.email}</p>}
        </div>
        <div className="form-input-group">
          <input
            className="form-input"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
