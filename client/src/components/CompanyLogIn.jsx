import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const CompanyLogIn = () => {
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
        navigate('/company/dashboard')
      })
      .catch((err) => {
        console.log(err)
        // Set Errors here for Validations
      })
  }


  return (
    <div>
      <h2>Company Log-In</h2>
      <div>
        <form onSubmit={handleCompanyLogIn}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id='email' name='email' onChange={handleCompanyChange}/>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="text" id='password' name='password' onChange={handleCompanyChange}/>
          </div>
          <button>Log-In</button>
        </form>
      </div>
    </div>
  )
}

export default CompanyLogIn