import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth'; // Import Auth
import '../styles/LoginForm.css';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useMutation(ADD_USER, { fetchPolicy: 'no-cache' });
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password }; // No need to handle username anymore

    try {
      // Execute the correct mutation based on the login state
      const { data } = isLogin
        ? await loginUser({ variables: payload }) // Call loginUser if isLogin is true
        : await addUser({ variables: payload }); // Call addUser if isLogin is false

      if (data?.signUp || data?.login) {
        const token = data.signUp?.token || data.login?.token;
        console.log('data', data);
        console.log('Token:', token);
        Auth.setToken(token); // Use Auth to set the token without reloading
        alert('Success!');
        navigate('/client'); // Redirect to ClientPage after successful login/sign-up
      } else {
        alert('Failed to login or sign up. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login/sign-up. Please try again.');
    }
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={handleToggle}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginForm;
