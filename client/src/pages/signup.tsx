import { AxiosResponse, AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import API from '../api';
import { LoginResponse, ErrorObject } from '../types';
import { saveToken } from '../actions/authActions';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    API.post('/auth/signup', { email, password, confirmPassword })
      .then((res: AxiosResponse<LoginResponse>) => {
        dispatch(saveToken(res.data.data));
        navigate('/');
        setErrors([]);
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data as ErrorObject;
        const arr = Object.values(data?.errors);
        setErrors(arr);
      });
  };

  return (
    <div className="signup-form">
      <div className="error-message">
        {errors.map((message) => <div key={message}>{message}</div>)}  
      </div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="description">Already have an account? <Link to="/login">Login</Link></div>
    </div>
  );
};

export default Signup;