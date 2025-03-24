import React, { Fragment, useEffect, useState } from 'react'
import Navbars from './Navbars'
import { Col, Form, Card, Row, Button } from 'react-bootstrap'
import { addUser, editUser, getUserById } from '../Api/UserApi'
import { useSelector } from 'react-redux'
import { getTestingOfficeOptions, getRoleOptions, getUserGroup, getCountry } from '../Api/Api'
import Select from './Custom/Select'
import { useNavigate, useParams } from 'react-router-dom'
import UserEnhancer from './UserEnhancer'
import { ErrorMessage, Field } from 'formik'
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function UserForm(props){
  const{edit, view, values, setValues, handleChange, submitForm, setFieldValue} = props
  // console.log(values)
  const {userId} = useParams()
  // console.log(userId)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [testingOffices, setTestingOffices] = useState([]);
  const [roleOptions, setRoleOptions] = useState([])
  // console.log(roleOptions)
  const [groupOptions, setGroupOptions] = useState([])
  // console.log(groupOptions)
  const [countryOptions, setCountryOptions] = useState([])
  // console.log(countryOptions)
  

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
    async function groupOptions() {
      const group = await getUserGroup()
      // console.log(group)
      setGroupOptions(group)
    }
    groupOptions()
  }, [])

  useEffect(() => {
    async function countryOptions() {
      const country = await getCountry()
      // console.log(country)
      setCountryOptions(country)
    }
    countryOptions()
  }, [])

  async function submitHandler(e) {
    submitForm()
    if(edit){
      const response = await editUser(token, userId, values)
      // console.log(response)
      if(response){
        // setValues(response)
        toast.success("User Update Successfully.")
        navigate('/users')
      }
    }
    else{
      try {
        const response = await addUser(token, values)
        if (response && response.data) {
          // console.log(response.data)
          // setValues(response)
          toast.success("User Added Succesfully.")
          navigate('/users')
        }
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  async function getUserDetails(){
    await getUserById(
      token, userId
    ).then((data)=>{
      // console.log(data?.value[0])
      setValues(data?.value[0])
    })
    .catch((error)=>  console.log(error))
  }
  useEffect(()=>{
    if(userId){
      getUserDetails()
    }
  },[userId])

  return (
    <Fragment>
      <Navbars />
      <Form className="mt-[8rem] m-8 space-y-6">
        <Row>
          <Col lg={12}>
            <h6 className='text-gray-600 text-xl font-medium m-2'>User Details</h6>
            <Card className=''>
              <Card.Body>
                <Row className='gap-8 m-8'>
                  <Col lg='3'>
                    <Form.Group controlId="FirstName">
                      <Form.Label className="text-gray-600 font-medium">
                        First Name
                      </Form.Label>
                       <div>
                       <Field
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                          onChange={(e)=>handleChange(e)}
                          value={values.FirstName}
                          type="text"
                          name='FirstName'
                          id="FirstName"
                          // required
                        />
                        <ErrorMessage
                        name="FirstName"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                       </div>
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="LastName">
                      <Form.Label className="text-gray-600 font-medium">
                        Last Name
                      </Form.Label>
                     <div>
                     <Field
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.LastName}
                        onChange={(e)=>handleChange(e)}
                        id="LastName"
                        name='LastName'
                        // required
                      />
                       <ErrorMessage
                        name="LastName"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                     </div>
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="Email">
                      <Form.Label className="text-gray-600 font-medium">
                        Email
                      </Form.Label>
                      <Field
                        type="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.Email}
                        onChange={(e)=>handleChange(e)}
                        name='Email'
                      />
                       <ErrorMessage
                        name="Email"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="Phone">
                      <Form.Label className="text-gray-600 font-medium">
                        Phone
                      </Form.Label>
                      <Field
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.Phone}
                        onChange={(e)=>handleChange(e)}
                        name='Phone'
                        id="Phone"
                      />
                       <ErrorMessage
                        name="Phone"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="Phone">
                      <Form.Label className="text-gray-600 font-medium">
                        Country
                      </Form.Label>
                      <Select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.CountryId}
                        options={countryOptions}
                        setValue={(value) =>
                          setFieldValue("CountryId", value)
                        }
                        name="CountryId"
                        placeholder="Country"
                      />
                       <ErrorMessage
                        name="CountryId"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12}>
            <h6 className='text-gray-600 text-xl font-medium m-2'>Additonal Details</h6>
            <Card className=''>
              <Card.Body>
                <Row className='gap-8 m-8'>
                  <Col lg='3'>
                    <Form.Group controlId="Email">
                      <Form.Label className="text-gray-600 font-medium">
                        Testing Office
                      </Form.Label>
                      <Select
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.TestingOfficeId}
                        options={testingOffices}
                        setValue={(value) =>
                          setFieldValue("TestingOfficeId", value)
                        }
                        name="TestingOfficeId"
                        placeholder="Testing Office"
                      />
                       <ErrorMessage
                        name="TestingOfficeId"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="Phone">
                      <Form.Label className="text-gray-600 font-medium">
                        Role
                      </Form.Label>
                      <Select
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.UserRolesNameId}
                        options={roleOptions}
                        setValue={(value) =>
                          setFieldValue("UserRolesNameId", value)
                        }
                        name="UserRolesNameId"
                        placeholder="User Role"
                      />
                       <ErrorMessage
                        name="UserRolesNameId"
                        component="div"
                        className="text-red-500 font-medium"
                        />
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="Phone">
                      <Form.Label className="text-gray-600 font-medium">
                        User Group
                      </Form.Label>
                      <Select
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.UserGroupName}
                        options={groupOptions}
                       setValue={(value)=>
                        setFieldValue("UserGroupName", value)
                       }
                        name="UserGroupName"
                        placeholder="User Group"
                      />
                      <ErrorMessage
                        name="UserGroupName"
                        component="div"
                        className="text-red-500 font-medium"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12}>
            <h6 className='text-gray-600 text-xl font-medium m-2'>Login Details</h6>
            <Card className=''>
              <Card.Body>
                <Row className='gap-8 m-8'>
                  <Col lg='3'>
                    <Form.Group controlId="UserName">
                      <Form.Label className="text-gray-600 font-medium">
                        Username
                      </Form.Label>
                      <Field
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.UserName}
                        onChange={(e)=>handleChange(e)}
                        name='UserName'
                        id="UserName"
                      />
                      <ErrorMessage
                      name="UserName"
                      className="text-red-500 font-medium"
                      component="div"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg='3'>
                    <Form.Group controlId="Password">
                      <Form.Label className="text-gray-600 font-medium">
                        Password
                      </Form.Label>
                      <Field
                        type="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                        value={values.Password}
                        onChange={(e)=> handleChange(e)}
                        name='Password'
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       <Button
          type="button"
          variant="primary"
          onClick={() => submitHandler()}
        >
         {edit? 'Update': 'Submit'}
        </Button>
        <Button
        className='ml-4'
        type='Button'
        variant='primary'
        onClick={()=> navigate(-1)}
        >
          Cancel
          </Button>
      </Form>
    </Fragment>
  )
}

export default UserEnhancer(UserForm)
