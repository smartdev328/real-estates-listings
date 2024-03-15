import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';

import API from '../api';
import { ErrorObject, LoginResponse } from '../types';
import { saveToken } from '../actions/authActions';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    API.post('/auth/login', { email, password })
      .then((res: AxiosResponse<LoginResponse>) => {
        dispatch(saveToken(res.data.data));
        navigate('/');
        setMessage('');
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data as ErrorObject;
        setMessage(data?.errors?.join('\n'));
      });
  };

  return (
    <div className="login-form">
      <div className="error-message">{message}</div>
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
        <button type="submit">Log In</button>
      </form>
      <div className="description">Don't have an account? <Link to="/signup">Signup</Link></div>
    </div>
  );
};

export default Login;
 