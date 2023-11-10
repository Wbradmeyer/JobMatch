import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const SeekerLogIn = () => {
  const navigate = useNavigate()
  const [seekerUser, setSeekerUser] = useState({
    email: '',
    password: ''
  })

  const handleSeekerChange = (e) => {
    setSeekerUser({
      ...seekerUser,
      [e.target.name]: e.target.value
    })
  }

  const handleSeekerLogIn = (e) => {
    e.preventDefault()

    axios
      .post('', seekerUser, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("currentUser", JSON.stringify(res.data))
        navigate('/seeker/dashboard')
      })
      .catch((err) => {
        console.log(err)
        // Set Errors here for Validations
      })
  }


  return (
    <div>
      <h2>Job Seeker Log-In</h2>
        <div>
          <form onSubmit={handleSeekerLogIn}>
            <div>
              <label htmlFor="seekerEmail">Email:</label>
              <input type="text" id='seekerEmail' name='seekerEmail' onChange={handleSeekerChange}/>
            </div>
            <div>
              <label htmlFor="seekerPassword">Password:</label>
              <input type="text" id='seekerPassword' name='seekerPassword' onChange={handleSeekerChange}/>
            </div>
            <button>Log-In</button>
          </form>
        </div>
    </div>
  )
}

export default SeekerLogIn