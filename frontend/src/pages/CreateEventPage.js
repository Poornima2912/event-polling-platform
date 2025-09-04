import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Event created successfully!');
      navigate('/dashboard'); // Redirect after creation
    } catch (err) {
      setMessage(err.response?.data?.message || 'Event creation failed');
    }
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Event Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Event Description" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateEventPage;
