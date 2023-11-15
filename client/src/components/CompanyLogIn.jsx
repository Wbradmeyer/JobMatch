import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { userContext } from "../context/UserContext";





const CompanyLogIn = () => {
  const {setCurrentUser} = useContext(userContext)
  const navigate = useNavigate()
  const [companyUser, setCompanyUser] = useState({
    email: '',
    password: ''
  })

  const handleCompanyChange = (e) => {
    setCompanyUser({
      ...companyUser,
      [e.target.name]: e.target.value
    })
  }

  const handleCompanyLogIn = (e) => {
    e.preventDefault()

    axios
      .post("http://localhost:8000/company/login", companyUser, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("currentUser", JSON.stringify(res.data))
        setCurrentUser(res.data)
        navigate('/company/dashboard')
      })
      .catch((err) => {
        console.log(err)
        // Set Errors here for Validations
      })
  }


  return (
    <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
        <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Company Log-In</h2>
          <form onSubmit={handleCompanyLogIn} className='space-y-4 md:space-y-6'>
            <div>
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email:</label>
              <input type="text" id='email' name='email' onChange={handleCompanyChange} className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>
            <div>
              <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password:</label>
              <input type="password" id='password' name='password' onChange={handleCompanyChange} className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
            </div>
            <div>
            <Link to={'/seekerRegister'} className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>Company Register</Link>
            </div>
            <button className='w-full bg-sky-300 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Log-In</button>
          </form>
      </div>
    </div>
  )
}

export default CompanyLogIn