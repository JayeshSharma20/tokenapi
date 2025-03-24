import {React, useEffect} from 'react';
import {Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';   
import Products from './Components/Products';
import ProductAdd from './Components/ProductAdd';
import User from './Components/User';
import UserForm from './Components/UserForm';
import { useDispatch } from 'react-redux';
import { setUser } from './reduxStore/reducer/authReducer';
import './index.css'
import UserView from './Components/UserView';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
    //   console.log(user)
      const token = localStorage.getItem("token");
      if (user && token) {
        dispatch(setUser({ user })); 
      }
    }, [dispatch]);

    return (
      <>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} /> 
                    <Route path="/addproducts" element={<ProductAdd />} /> 
                    <Route path="users" element={<User />} /> 
                    <Route path="usersform" element={<UserForm />} />
                    <Route path="usersform/:userId" element={<UserForm edit={true} />} />
                    <Route path="usersview/:userId" element={<UserView />} /> 
                  </Routes>
                    <ToastContainer
                     position='top-right' 
                     autoClose={3000}
                    />
                    </>
    );
};

export default App;

