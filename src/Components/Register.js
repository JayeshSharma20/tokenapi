import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { register } from '../reduxStore/reducer/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const { isLoading, error, user } = useSelector((state) => state.auth)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const submit = async (e) => {
    e.preventDefault();
    // dispatch(register({ username, email, password }))
  };


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>

          <Form onSubmit={submit} className="space-y-4">
            <div>
              <Form.Group htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username:
                <Form.Control
                  type="text"
                  name="username"
                  id="username"
                  placeholder='Enter username'
                  value={username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </Form.Group>
            </div>
            <Form.Group className="block text-sm font-medium text-gray-700" controlId="formBasicEmail">
              Email:
              <Form.Control
                type="email"
                name='email'
                onChange={handleInputChange}
                placeholder="Enter email"
                value={email}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </Form.Group>

            <div>
              <Form.Group htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
                <div className='relative'>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder='Password'
                    value={password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <span
                    className="absolute right-2 top-3 cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </Form.Group>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button
              variant="primary"
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;


