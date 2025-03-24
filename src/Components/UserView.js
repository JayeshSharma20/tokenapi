// HomePage.js
import React, { Fragment, useEffect, useState } from 'react';
import Navbars from './Navbars';
import "../App.css"
import { getUserById } from '../Api/UserApi';
import { useParams } from 'react-router-dom';
import { getTestingOfficeOptions, getRoleOptions, getCountry } from '../Api/Api';
import { Link } from 'react-router-dom';

const UserView = () => {
  const token = localStorage.getItem('token')
  // console.log(token)
  const { userId } = useParams();
  // console.log(userId)
  const [value, setValue] = useState([])
  const [testingOffices, setTestingOffices] = useState([])
  const [roleOptions, setRoleOptions] = useState([])
  // const [groupOptions, setGroupOptions] = useState([])
  const [countryOptions, setCountryOptions] = useState([])

  async function userDetails() {
    await getUserById(token, userId)
      .then((data) => {
        // console.log(data?.value[0])
        setValue(data?.value[0])
      })
  }
  useEffect(() => {
    if (userId) {
      userDetails()
    }
  }, [userId])

  useEffect(() => {
    async function testingOptions() {
      const offices = await getTestingOfficeOptions()
      // console.log(offices)
      setTestingOffices(offices)
    }
    testingOptions()
  }, [])

  useEffect(() => {
    async function roleOptions() {
      const role = await getRoleOptions()
      // console.log(role)
      setRoleOptions(role)
    }
    roleOptions()
  }, [])

   useEffect(() => {
      async function countryOptions() {
        const country = await getCountry()
        // console.log(country)
        setCountryOptions(country)
      }
      countryOptions()
    }, [])

  return (
    <Fragment>
      <Navbars />
      {/* <Card> 
        <Card.Body> */}
      <div className="container mx-auto p-6">
        <div className="w-full p-4">
          <h2 className="text-2xl font-bold  mb-4">User Details</h2>
          
          <ul className="space-y-4">
            <li className="mb-2">
              <span className="title">UserName : </span>
              <span className='text'>{value.UserName}</span>
            </li>
            <li className=" flex">
              <span className="title">First Name : </span>
              <span className='text'> {value.FirstName}</span>
            </li>
            <li className="mb-2">
              <span className="title">Last Name : </span>
              <span className='text'>{value.LastName}</span>
            </li>
            <li className="mb-2">
              <span className="title">Email : </span>

              <span className='text'> {value.Email}</span>
            </li>
            <li className="mb-2">
              <span className="title">Phone : </span>
              {/* {userData.phone} */}
              <span className='text'> {value.Phone}</span>
            </li>
            <li className="mb-2">
              <span className="title">Country :</span>
              {/* {userData.phone} */}
              <span className='text'>
              {
                          countryOptions.find(
                            (f) => f.value === value.CountryId
                          )?.label
                        }
              </span>
            </li>
            <li className="mb-2">
              <span className="title">User Role : </span>
              {/* {userData.userRoleId} */}
              <span className='text'>
                {
                  roleOptions.find(
                    (f) => f.value === value.UserRolesNameId
                  )?.label
                }
              </span>
            </li>
            <li className="mb-2">
              <span className="title">Testing Office : </span>
              <span className='text'>
                {
                  testingOffices.find(
                    (f) => f.value === value.TestingOfficeId
                  )?.label
                }
              </span>
            </li>
            <li className="mb-2">
              <span className="title">User Group : </span>
              <span className='text'>
                {value.UserGroupName}
              </span>
            </li>
          </ul>
        </div>
        <Link
           to={`/usersform/${userId}`}
            className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded"
          >
          Edit User
          </Link>
      </div>
      {/* </Card.Body>
      </Card> */}
    </Fragment>
  );
};

export default UserView;
