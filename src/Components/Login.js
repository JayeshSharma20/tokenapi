// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../reduxStore/reducer/authReducer';
// import { useNavigate, useParams } from 'react-router-dom';
// import {Form, Button} from 'react-bootstrap';
// // import Button from 'react-bootstrap/Button';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import axios from 'axios';
// import {toast} from 'react-toastify'
// import { Formik, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const { islog } = useSelector((state) => state.user);

//   const loginSchema = Yup.object().shape({
//     username: Yup.string().required("This field is required"),
//     password: Yup.string().required("This field is required")
//   })
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (values, {setSubmitting}) => {
//     // e.preventDefault();
//     try {
//       const response = await axios.post(
//         'https://dummyjson.com/auth/login',
//         { username: values.username, password:values.password },
//         { headers: { 'Content-Type': 'application/json' }}
//       );
//       const data = response.data;
//       const token = data.token;
//       console.log(data)
//       localStorage.setItem('user', JSON.stringify(data))
//       localStorage.setItem('token', token);
//       dispatch(login({ islog: true, user: data }));
//       navigate("products")
//       toast.success("User Login Successfully.")
//     } catch (error) {
//       // setLoginError('Login failed. Please check your credentials.');
//       console.error('Login Error:', error);
//     }
//    finally{
//     setSubmitting(false)
//    }
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-200">
//       <div className="w-full max-w-sm bg-gray-800 p-16">
//         <h2 className="text-3xl font-extrabold text-center mb-10 text-white">
//           Login Form
//         </h2>
//         <Formik 
//         initialValues={{
//           username:'',
//           password:''
//         }}
//         validationSchema={loginSchema}
//         onSubmit={handleLogin}
//         >
//            {({ isSubmitting, errors, touched }) => (
//         <Form onSubmit={handleLogin} className="space-y-6">
//           <Form.Group controlId="username">
//             <Form.Label
            
//             className="font-small text-white">
//               Username:
//             </Form.Label>
//             <Field
//               id="username"
//               name="username"
//               type="text"
//               placeholder="Enter username"
//               // value={values.username}
//               // onChange={(e) => handleLogin(e)}
//               className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <ErrorMessage name='username' component='div' className='text-red-500'/>
//           </Form.Group>

//           <Form.Group controlId="password">
//             <Form.Label className="font-small text-white">Password:</Form.Label>
//             <div className="relative">
//               <Field
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 // value={values.password}
//                 // onChange={(e) => handleLogin(e)}
//                 className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <ErrorMessage name='password' component='div' className='text-red-500'/>
//               <span
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//               </span>
//             </div>
//             <Button
//             type="submit"
//             className="w-full py-2 mt-12 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Loggin in.." : "Login"}
//           </Button>
//           </Form.Group>
//         </Form>
//         )}
//       </Formik>
//       </div>
//     </div>

//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reduxStore/reducer/authReducer';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { islog } = useSelector((state) => state.user);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('This field is required.'),
    password: Yup.string().required('This field is required.'),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        'https://dummyjson.com/auth/login',
        { username: values.username, password: values.password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const data = response.data;
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      dispatch(login({ islog: true, user: data }));
      toast.success('User Login Successfully.');
      navigate('/products');
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-200">
      <div className="w-full max-w-sm bg-gray-800 p-16">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-white">
          Login Form
        </h2>
        
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, isSubmitting }) => (
            <FormikForm className="space-y-6">
              <Form.Group controlId="username">
                <Form.Label className="font-small text-white">Username:</Form.Label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-600" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="font-small text-white">Password:</Form.Label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600" />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </Form.Group>

              <Button
                type="submit"
                className="w-full py-2 mt-12 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

