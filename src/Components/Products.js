import React, { useState, useEffect } from 'react';
import Navbars from './Navbars';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { fetchProducts } from '../reduxStore/reducer/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Custom/Modal';
import axios from 'axios';

const Products = () => {
  // const [product, setProduct] = useState([]);
  // // console.log(product)
  // const [isLoading, setIsLoading] = useState(false);
  // const [category, setCategory] = useState([]);
  // // console.log(category)
  // // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState('');
  // console.log(category)
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const id = useParams()
  // console.log(id)
  const token = localStorage.getItem("token")
  // console.log(token)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.filteredProducts);
  // console.log(products)
  const status = useSelector((state) => state.product.status)
 console.log(status)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  function openModal(){
    setIsModalOpen(true)
    console.log("Model Open")
  }

  function closeModal(){
    setIsModalOpen(false)
  }
  // generateQuery()
  // const productsByCategory = async (category) => {
  //   // console.log(category)
  //   const url =
  //     //   ? `https://dummyjson.com/products/category/${category}`
  //     `https://fakestoreapi.in/api/products?limit=25`;
  //   // console.log(url)
  //   // console.log(category)
  //   const response = await axios.get(url);
  //   // console.log(response.data.products)
  //   //   const map = response.data.products.map((x)=>({
  //   //     id: x.id,
  //   //     value: x.brand,
  //   //     label: x.title
  //   //   })).forEach((item)=>
  //   //      console.log(item.label)
  //   // )


  //   // setProduct(response.data)
  //   // response.data.products.forEach((val)=>{
  //   // console.log(val.price)
  //   // })
  //   // const rev = response.data.products.sort()
  //   // console.log(rev)

  //   // const iterator = response.data.products.values();
  //   // for (const value of iterator) {
  //   // console.log(value.price)
  //   // }
  //   // const formattedPrice = response.data.products.map((x)=> ({
  //   // value: x.price,
  //   // }))
  //   // console.log(formattedPrice)
  //   // const reduce = response.data.products.reduce((total, item) => total + item.price, 0)
  //   // console.log("Total price of all Products:",reduce)
  //   // setFilteredProducts(response.data.products);
  //   setProduct(response.data.products)
  // };

  // const handleCategoryChange = async (event) => {
  //   const selected = event.target.value;
  //   // console.log(selected)
  //   setSelectedCategory(selected);
  //   await productsByCategory(selected);
  // };

  // const getCatogories = async () => {
  //   setIsLoading(true);
  //   const response = await axios.get(`https://fakestoreapi.in/api/products/category`);
  //   // console.log(response.data.categories)
  //   const category = response.data.categories.map((item, index) => ({
  //     value: index,
  //     label: item
  //   }))
  //   // console.log(category)
  //   // const iterator = response.data.keys();
  //   //  console.log(iterator)
  //   // const filter = response.data.filter((x) => x.name === 'Beauty');
  //   // console.log(filter)
  //   // const reduce = response.data.categories.reduce((acc, item) => {
  //   //   acc[item.slug] = item.name;
  //   //   // console.log(acc)
  //   //   return acc;
  //   // })
  //   // console.log(reduce)
  //   // response.data.categories.forEach((item) => {
  //   //   setCategory(item)
  //   //   console.log(item)
  //   // })
  //   // const entries = response.data.entries()
  //   // // console.log(entries)
  //   // for (const [key, value] of entries) {
  //   //   // console.log(key, value) 
  //   // }
  //   setCategory(category);
  //   // setIsLoading(false);
  // }
  // useEffect(() => {
  //   if (user) {
  //     getCatogories()
  //     productsByCategory()
  //     // getAllProductList()
  //   };
  // }, [user]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbars />
      <div className="flex-1">
        <Sidebar
        />
        <div className="flex flex-col text-center bg-white sm:mt-4 md:ml-56">
          <div className='flex justify-center items-center gap-4 mt-[6rem] sm:mt[2rem]'>
            {/* <Link
              to="/addproducts"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-2 ml-8 rounded w-full sm:w-40"
            >
              Add Product
            </Link> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 dark:text-black">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-1 rounded-2xl border-gray-600 p-4 flex flex-col items-center cursor-pointer text-sm"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-50 h-50 object-cover mb-2  opacity:1 transform: none w-full rounded-xl shadow-lg relative overflow-hidden bg-white"
                />
                <div className='flex flex-col items-center'>
                  <span className="">Title: {product.model}</span>
                  <span className="f">Brand Name: {product.brand}</span>
                  {/* <span className="font-semibold">Category Name: {product.category}</span> */}

                  <div className='flex flex-row items-center gap-2'>

                    {/* <span className='mt-2 pl-[10px] text-white text-sm h-6 w-20 rounded-full text-center flex items-center bg-gradient-to-r from-red-600 to-yellow-500'>Hot Deal</span> */}

                    <span className="rounded-full justify-center items-center font-semibold  text-sm mt-2 text-black">Price- ${product.price}</span>
                    <span
                      className={`mt-2 pl-[10px] bg-red-600 text-white text-sm h-7 w-16 rounded-full text-center flex items-center`}
                    >
                      {product.discount ? `${product.discount}% off` : "5% off"}
                    </span>
                  </div>

                  {/* {
                 product.discount ? 
                <div className='flex flex-col items-center '>
                <span className="mt-2 pl-[10px] bg-red-500 text-white text-sm h-10 w-16 rounded-full text-center flex items-center"> { product.discount}% off
                </span> 
                </div> :""
                }  */}
                </div>
                <div className='flex gap-2'>
                  <Button  
                  className="mt-2 text-sm "
                  onClick={openModal}
                  >
                    View Details
                  </Button>
                  <Modal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  message={"PopUp Open"}
                  // data={data}
                  />
                  <Button
                    variant="primary"
                    className="mt-2 text-sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
