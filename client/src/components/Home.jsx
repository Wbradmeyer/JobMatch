import React from 'react'
import CompanyLogIn from './CompanyLogIn'
import SeekerLogIn from './SeekerLogIn'

const Home = () => {



  return (
    <div>
      <div className="container mx-auto my-20">
        <div className='col'>
          <CompanyLogIn/>
        </div>
        <div className='col'>
          <SeekerLogIn/>
        </div>
      </div>
    </div>
  )
}

export default Home