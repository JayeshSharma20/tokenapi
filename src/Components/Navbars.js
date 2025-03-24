import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reduxStore/reducer/authReducer';
import { AiFillProduct } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const Navbars = () => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userId = useParams()
    // console.log(userId)

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Fragment>
            <div className="fixed top-0 left-0 w-full z-40 bg-gray-800 sm:px-2 sm:py-2 flex flex-col md:flex-row md:justify-between md:items-center">
                <div className='flex gap-8'>
                    <h1 className="text-white font-small text-sm text-center ml-24 mt-2 sm:ml-8 md:text-lg">
                        Welcome, {user?.username} {user?.firstName}
                    </h1>
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-50 sm:w-64 ml-20 mt-2 px-2 py-1 sm:px-2 sm:py-2 rounded"
                    />
                <div className="mt-2 md:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-4">
                    {!user ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Link to="/register">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                                    Register
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                                    Login
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-row sm:flex-row gap-6 ml-6 sm:gap-4 items-center">
                            <Link
                                to="/products"
                                className="flex items-center gap-2 text-white sm:px-4 sm:py-2  hover:bg-white/30 rounded"
                            >
                                <AiFillProduct />Products
                            </Link>
                            <Link
                                to="/users"
                                className="flex items-center gap-2 sm:px-4 sm:py-2  text-white hover:bg-white/30 rounded"
                            >
                                <FaUser /> Users
                            </Link>
                            <Link
                                to="/"
                                className="flex items-center gap-2 sm:px-4 sm:py-2 text-white hover:bg-white/30  rounded"
                                onClick={handleLogout}
                            >
                                <IoMdLogOut /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Navbars;
