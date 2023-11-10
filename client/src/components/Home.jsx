import React from 'react'
import CompanyLogIn from './CompanyLogIn'
import SeekerLogIn from './SeekerLogIn'

const Home = () => {



  return (
    <div>
      <div className="container">
        <div className='col'>
          <CompanyLogIn/>
          <div>
            <Link>Register as a Company</Link>
          </div>
        </div>
        <div className='col'>
          <SeekerLogIn/>
          <div>
            <Link>Register as a Job Seeker</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home