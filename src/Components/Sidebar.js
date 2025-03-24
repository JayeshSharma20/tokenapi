import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../reduxStore/reducer/CategorySlice";
import { filterProducts } from "../reduxStore/reducer/ProductSlice";

function Sidebar( {}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  // console.log(dispatch)
  const categories = useSelector((state)=> state.category.categories)
  // console.log(categories)
  // console.log(isOpen)

  return (
    <div>
      <div
        className="fixed top-4 text-white bg-gray-600 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>
      <div
        className={`md:mt-[4rem] fixed top-0 left-0 w-56 bg-gradient-to-b from-rose-900 to-gray-800 text-white h-screen p-4 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0  z-30`
    }
      >
      <div className="md:mt-8">
        <h1 className="text-l font-bold mb-3 px-4">Categories</h1>
        {categories.map((category, index)=>(
          <ul 
          className="grid mt-2 relative dark:text-white text-sm"
          key={index}
          onClick={()=> dispatch(filterProducts(category))}
          >
            <li className="">
            <Link
              // to="/"
              className="block py-2 px-4 hover:bg-white/30 rounded"
              // onClick={() => setIsOpen(false)}
            >
              {category}
            </Link>
          </li>
          </ul>
        ))}
        </div>
    </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
