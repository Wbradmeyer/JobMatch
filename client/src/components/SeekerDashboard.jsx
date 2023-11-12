import React, {useContext} from 'react'
import { userContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const SeekerDashboard = () => {
  const {currentUser, setCurrentUser} = useContext(userContext)
  const navigate = useNavigate()

  const logoutUser = () => {
    axios
      .post('http://localhost:8000/seeker/logout', {}, {withCredentials: true})
      .then((res) => {
        navigate("/")
        // localStorage is not clearing - don't know why
        localStorage.clear()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // useEffect with axios call to get all jobs: setJobs 

  // useEffect with axios call to get all companies: setCompanies


  return (
    <div>
      <Link to={'/'} onClick={logoutUser}>Logout</Link>
      <h2>{currentUser.name}'s Dashboard</h2>
      <div>
        <div>
          <p>Skills/Experience:</p>
          {
            currentUser.languages.map((language, index) => {
              return (
                <p key={index}>{language}</p>
              )
            })
          }
          {
            currentUser.frameworks.map((framework, index) => {
              return (
                <p key={index}>{framework}</p>
              )
            })
          }
        </div>
        <div>
          <p>Bio:</p>
          <p>{currentUser.bio}</p>
        </div>
      </div>
      <div>
        {/* Add filter button for interested jobs here */}
        <table>
          <thead>
            <tr>
              {/* For Job Matches: Using filter??? If 1 language and one framework matches up with job languages and frameworks display job.title */}
              <th>Job Matches</th>
              {/* For Company: If job.company._id == company._id display company.name */}
              <th>Company</th>
              {/* For Interested: Checkbox, add filter button on top of table to filter jobs interested in */}
              <th>Interested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Demo</td>
              <td>Demo</td>
              <td>Demo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SeekerDashboard