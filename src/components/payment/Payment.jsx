import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'; 

function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.number) {
      errors.number = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.number)) {
      errors.number = 'Mobile number must be 10 digits';
    }

    if (!formData.amount) {
      errors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || formData.amount <= 0) {
      errors.amount = 'Amount must be a positive number';
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let data = {
      ...formData,
      MID: 'MID' + Date.now(),
      transactionId: 'T' + Date.now()
    };

    try {
      const res = await axios.post('http://localhost:8000/order', data);
      console.log(res.data);
      if (res.data.success === true) {
        window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <form className="payment-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            id="name"
            required 
            placeholder="Enter your name"
            className={errors.name && 'error-input'}
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            id="email"
            required 
            placeholder="Enter your email"
            className={errors.email && 'error-input'}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="number">Mobile No:</label>
          <input 
            type="tel" 
            name="number" 
            value={formData.number} 
            onChange={handleChange} 
            id="number"
            required 
            placeholder="Enter your mobile number"
            className={errors.number && 'error-input'}
          />
          {errors.number && <small className="error">{errors.number}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input 
            type="text" 
            name="amount" 
            value={formData.amount} 
            onChange={handleChange} 
            id="amount"
            required 
            placeholder="Enter amount"
            className={errors.amount && 'error-input'}
          />
          {errors.amount && <small className="error">{errors.amount}</small>}
        </div>
        <button type="button" onClick={handleClick} className="submit-button">Pay Now</button>
      </form>
    </div>
  );
}

export default Payment;
