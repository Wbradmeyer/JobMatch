import React, {useContext} from 'react'
import { userContext } from '../context/UserContext'

const SeekerDashboard = () => {
  const {currentUser, setCurrentUser} = useContext(userContext)

  return (
    <div>
      <h2>{currentUser.name}'s Dashboard</h2>
      <div>
        <div>
          <p>Skills/Experience:</p>
        </div>
        <div>
          <p>Bio:</p>
        </div>
      </div>
      <div>
        <table>
          <tr>
            <th>Job Matches</th>
            <th>Company</th>
            <th>Interested</th>
          </tr>
          <tr>
            <td>Demo</td>
            <td>Demo</td>
            <td>Demo</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default SeekerDashboard