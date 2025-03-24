import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reduxStore/reducer/authReducer';
import { useNavigate, useParams } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import {toast} from 'react-toastify'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { islog } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://18.158.81.67:8080/api/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' }}
      );
      const data = response.data;
      const token = data.token;
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      localStorage.setItem('token', token);
      dispatch(login({ islog: true, user: data }));
      toast.success("User Login Successfully.")
    } catch (error) {
      // setLoginError('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  if (islog) {
   navigate("products")
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-blue-600">
      <div className="w-full max-w-md bg-gray-800 p-20 rounded-xl">
        <h2 className="text-xl font-semibold text-center mb-10 text-white">
          Login Form
        </h2>
        <Form onSubmit={handleLogin} className="space-y-6">
          <Form.Group controlId="username">
            <Form.Label className="text-gray-600 font-small text-white">
              Username:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className="text-gray-600 font-small text-white">Password:</Form.Label>
            <div className="relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span
                // className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <Button
            type="submit"
            className="w-full py-2 mt-8 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </Button>
          </Form.Group>
        </Form>
      </div>
    </div>

  );
};

export default Login;
