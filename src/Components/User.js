import React, { useEffect, useState, Fragment, useCallback } from 'react'
import Navbars from './Navbars';
import Table from './Custom/Table';
import { userRolesList, getTestingOffice, userList, userGroupList } from '../Api/UserApi';
import Select from './Custom/Select';
import { Badge, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import { useSelector } from 'react-redux';

const User = () => {
  const userId = useParams()
  // console.log(userId)
  const [data, setData] = useState([]);
  const [roleOptions, setRoleOptions] = useState([])
  // console.log(roleOptions)
  const [testingOptions, setTestingOptions] = useState([])
  // console.log(testingOptions)
  const [userGroup, setUserGroup] = useState([])
  const [selectOption, setSelectOption] = useState(
    {
    TestingOfficeId : null,
    isActive: "true"
  }
)
  // console.log(selectOption)
  const [filterData, setFilterData] = useState([])
  // console.log(filterData)
  const [searchTerm, setSearchTerm] = useState('');
  // console.log(searchTerm)
  const token = localStorage.getItem('token')
  // console.log(token)
  const searchParam = ["FirstName", "LastName", "UserName", "Email"]
  // console.log(typeof(searchParam))
  const statusOptions =[
    {
      value:"true",
      label:"Active"
    },
    {
      value:"false",
      label:"InActive"
    }
  ]

  const columns = [
    {
      selector: (info) => <Link to={`/usersview/${info.Id}`}>{info.username}</Link>,
      name: "UserName",
      grow: 2,
      allowOverflow: true,
      sortable: true,
      wrap: true,
    },
    {
      selector: (info) => info.name.firstname,
      name: "FirstName",
      grow: 2,
      sortable: true,
      allowOverflow: true,
    },
    {
      selector: (info) => info.name.lastname,
      name: "LastName",
      grow: 2,
      sortable: true,
      allowOverflow: true,
    },
    {
      selector: (info) => info.email,
      name: "Email",
      grow: 2,
      sortable: true,
      allowOverflow: true,
      wrap: true,
    },
    {
      selector: (info) => info.phone,
      name: "Phone",
      grow: 3,
      sortable: true,
      allowOverflow: true,
    },
    {
      name: "Address",
      grow: 2,
      selector: (info) => info.address.city,
      sortable: true,
      // sortField: "Roles",
      allowOverflow: true,
    },
    // {
    //   name: "Testing Office",
    //   grow: 2,
    //   selector: (info) => info.TestingOffice?.TestingOfficeName,
    //   sortable: true,
    //   sortField: "Testing Office",
    //   allowOverflow: true,
    // },
    // {
    //   name: "Group",
    //   grow: 2,
    //   selector: (info) => info.UserGroupName,
    //   sortable: true,
    //   sortField: "UserGroupName",
    // },
    
    // {
    //   name: "Status",
    //   grow: 2,
    //   selector: (info) => (
    //     <Badge
    //       bg={`${info.isActive
    //         ? "success"
    //         : "danger"
    //         }`}
    //     >
    //       {
    //         info.isActive ? "Active" : "InActive"
    //       }
    //     </Badge>
    //   ),
    // },
    // {
    //   name: 'Actions',
    //   selector: (info) => (
    //     <Link
    //       to={`/usersform/${info.Id}`}
    //       className='edit'
    //     >
    //       <FaPen />
    //     </Link>
    //   )
    // },
    // {
    //   selector: (info) => (
    //     <Link
    //       to={`/usersview/${info.Id}`}
    //       className='edit'
    //     >
    //       <FaEye />
    //     </Link>
    //   )
    // }
  ]

  function generateSearchQuery(selectOption, searchTerm="", searchParam = []){
    console.log(selectOption);

    let filter = ""; 
    // console.log(x)
    for (const key in selectOption) {  //iterate over the each key in selectOption.
      if (selectOption[key]) {
        console.log(selectOption[key])
        filter = filter === ""
          ? `&$filter=${key} eq ${
              key.includes("Id") || key.includes("isActive")
                ? selectOption[key]
                : `'${selectOption[key]}'`
            }`
          : `${filter} AND ${key} eq ${
              key.includes("Id") || key.includes("isActive" )
                ? selectOption[key]
                : `'${selectOption[key]}'`
            }`;
      }
    }
    // console.log(filter);
   
    let searchLink = "";
    if (searchTerm) {
      searchParam.forEach((param) => {  //iterate over the each param in searchParam.
        searchLink = searchLink === "" 
          ? `contains(tolower(${param}),'${searchTerm}') eq true`
          : `${searchLink} OR contains(tolower(${param}),'${searchTerm}') eq true`;
      });
    }
    // console.log(searchLink);

    filter = searchLink
      ? filter === ""
        ? `&$filter=${searchLink}`
        : `${filter} AND (${searchLink})`
      : filter;
  
    // console.log(filter);
    return filter;
  }

  async function userList() {
    const response = await axios.get("https://fakestoreapi.in/api/users?limit=40")
    console.log(response)
    setData(response.data.users)
  }

  const callData = useCallback(async () => {
    let searchQuery = generateSearchQuery(selectOption, searchTerm, searchParam)
    // console.log(searchQuery)
    await userList(
      // token,
      // `?$count=true&$expand=UserRolesName($select=RoleName),TestingOffice($select=TestingOfficeName)${searchQuery}&$orderby=CreatedOn DESC`
      // 'https://dummyjson.com/users'
      
    )
      .then((data) => {
        console.log(data?.value) 
        setData(data?.value)
        setFilterData(data?.value)
      })
      .catch((error) => console.log(error))
  }, [searchTerm, selectOption])

  async function getTestingOfficeOptions() {
    await getTestingOffice(
      token,
      `?$select=TestingOfficeName,Id,isActive`
    )
      .then((data) => {
        // console.log(data?.value)
        let testing = data?.value.map((x) => ({
          value: x.Id,
          label: x.TestingOfficeName
        }))
        setTestingOptions(testing);
        // console.log(testing)
      })
      .catch((error) => console.log(error))
  }

  async function getUserGroup() {
    await userGroupList(token)
      .then((data) => {
        // console.log(data)
        let group = data.map((x) => ({
          label: x.key
        }))
        // console.log(group)
        setUserGroup(group)
      })
      .catch((error) => console.log(error))
  }

  async function getUserRole() {
    await userRolesList(token)
      .then((data) => {
        let role = data?.value.map((x) => ({
          value: x.Id,
          label: x.RoleName
        }))
        setRoleOptions(role);
        // console.log(role)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    // callData()
  }, [searchTerm, selectOption])

  useEffect(() => {
    // getTestingOfficeOptions()
    // getUserRole()
    // getUserGroup()
    userList()
  }, [])

  // useEffect(() => {
  //   if (selectOption) {
  //     // console.log(selectOption)
  //     const filtered = data.filter((user) => {
  //       const roleName = user.UserRolesName?.RoleName === selectOption.label;
  //       // console.log(roleName)
  //       const testingOffice = user.TestingOffice?.TestingOfficeName === selectOption.label;
  //       // console.log(testingOffice)
  //       const userGroup = user.UserGroupName === selectOption.label;
  //       // console.log(userGroup)
  //       return roleName || testingOffice || userGroup;
  //     });
  //     setFilterData(filtered);
  //     // console.log(filtered)
  //   } else {
  //     setFilterData(data);
  //   }
  // }, [selectOption, data]);

  return (
    <Fragment>
    <Navbars />
    <Card> 
      <div className="flex flex-wrap justify-center items-center gap-4 text-black p-2 mt-[8rem] md:mt-20">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="drop-down response"
        />
  
        <Select
          className="drop-down response"
          name="UserRolesNameId"
          placeholder="User Role"
          value={selectOption.UserRolesNameId}
          options={roleOptions}
          setValue={(value) =>
            setSelectOption({
              ...selectOption,
              UserRolesNameId:value,
            })
          }
        />
  
        <Select
          className="drop-down response"
          name="TestingOfficeId"
          placeholder="Testing Office"
          value={selectOption.TestingOfficeId}
          options={testingOptions}
          setValue={(value) =>
            setSelectOption({
              ...selectOption,
              TestingOfficeId: value,
            })
          }
        />
  
        <Select
          className="drop-down response"
          name="UserGroupName"
          placeholder="User Group"
          value={selectOption.UserGroupName}
          options={userGroup}
          setValue={(value) =>
            setSelectOption({
              ...selectOption,
              UserGroupName: value,
            })
          }
        />
  
        <Select
          className="drop-down response"
          name="Status"
          placeholder="Status"
          value={selectOption.isActive}
          options={statusOptions} 
          setValue={(value) =>
            setSelectOption({
              ...selectOption,
              isActive: value,
            })
          }
        />
  
        <Link to="/usersform">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded w-full sm:w-40">
            Add User 
          </button>
        </Link>
      </div>
  
      <div className="flex justify-center items-center text-black p-8">
        <div className="w-full max-w-7xl rounded bg-gray-500 border shadow p-4 overflow-x-auto">
          <Table  
           data={data} 
           columns={columns} 
           />
        </div>
      </div>
    </Card>
  </Fragment>
  
  )
}

export default User
