import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from "../context/UserContext";


const SeekerRegister = () => {
  const {setCurrentUser} = useContext(userContext)
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [checkedLanguages, setCheckedLanguages] = useState([])
  const [checkedFrameworks, setCheckedFrameworks] = useState([])
  const [seekerUser, setSeekerUser] = useState({
    name: '',
    location: '',
    bio: '',
    languages: checkedLanguages,
    frameworks: checkedFrameworks,
    email: '',
    password: '',
    confirmPassword: '',
  })

  // const handleLanguagesCheckedBoxes = (e) => {
  //   // console.log("Hello")
  //   if (e.target.checked) {
  //     console.log(e.target.checked)
  //     setCheckedLanguages([...checkedLanguages, e.target.value])
  //     console.log(checkedLanguages)
  //     setSeekerUser({
  //       ...seekerUser,
  //       languages: checkedLanguages
  //     })
  //   }
  // }

  const handleLanguagesCheckedBoxes = (e) => {
    if (e.target.checked) {
      setCheckedLanguages(prevLanguages => [...prevLanguages, e.target.value]);
      setSeekerUser(prevUser => ({
        ...prevUser,
        languages: [...prevUser.languages, e.target.value]
      }));
    } else {
      setCheckedLanguages(prevLanguages => prevLanguages.filter(lang => lang !== e.target.value));
      setSeekerUser(prevUser => ({
        ...prevUser,
        languages: prevUser.languages.filter(lang => lang !== e.target.value)
      }));
    }
  };

  // const handleFrameworksCheckedBoxes = (e) => {
  //   if (e.target.checked) {
  //     setCheckedFrameworks([...checkedFrameworks, e.target.value])
  //     setSeekerUser({
  //       ...seekerUser,
  //       frameworks: checkedFrameworks
  //     })
  //   }
  // }

  const handleFrameworksCheckedBoxes = (e) => {
    if (e.target.checked) {
      setCheckedFrameworks(prevFrameworks => [...prevFrameworks, e.target.value]);
      setSeekerUser(prevUser => ({
        ...prevUser,
        frameworks: [...prevUser.frameworks, e.target.value]
      }));
    } else {
      setCheckedFrameworks(prevFrameworks => prevFrameworks.filter(framework => framework !== e.target.value));
      setSeekerUser(prevUser => ({
        ...prevUser,
        frameworks: prevUser.frameworks.filter(framework => framework !== e.target.value)
      }));
    }
  };


  const handleRegisterChange = (e) => {
    setSeekerUser({
      ...seekerUser,
      [e.target.name]: e.target.value
    })
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8000/seeker/register', seekerUser, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('currentUser', JSON.stringify(res.data))
        setCurrentUser(res.data)
        navigate('/seeker/dashboard')
      })
      .catch((err) => {
        console.log(err)
        // Set errors for Validations here
        setError(err.response.data.error.errors)
      })
  }

  return (
    <div className="ml-10">
      <h2 className="mb-2 mt-0 text-5xl font-medium leading-tight">Register</h2>

        <form className="w-full max-w-lg" onSubmit={handleRegisterSubmit}>

        <div className="container mx-auto my-20">

          <div className="col">
            <div>
              <label  htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name:</label>
              <input  type="text" name='name' id='name' onChange={handleRegisterChange} />
              {
                error.name ? <p className='text-red-600'>{error.name.message}</p> : null
              }
            </div>
            <div>
              <label  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="location">Location:</label>
              <input type="text" name='location' id='location' onChange={handleRegisterChange}/>
              {
                error.location ? <p className='text-red-600'>{error.location.message}</p> : null
              }
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="bio">Bio:</label>
              <textarea name="bio" id="bio" cols="30" rows="4" onChange={handleRegisterChange}></textarea>
              {
                error.bio ? <p className='text-red-600'>{error.bio.message}</p> : null
              }
            </div>
          </div>

          <div className="col-span-2">
            <div>
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email:</label>
              <input type="text" id='email' name='email' onChange={handleRegisterChange} />
              {
                error.email ? <p className='text-red-600'>{error.email.message}</p> : null
              }
            </div>
            <div>
              <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password:</label>
              <input type="password" id='password' name='password' onChange={handleRegisterChange} />
              {
                error.password ? <p className='text-red-600'>{error.password.message}</p> : null
              }
            </div>
            <div>
              <label htmlFor="confirmPassword" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password:</label>
              <input type="password" id='confirmPassword' name='confirmPassword' onChange={handleRegisterChange} />
              {
                error.confirmPassword ? <p className='text-red-600'>{error.confirmPassword.message}</p> : null
              }
            </div>&nbsp;
            <div>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800">Register</button>
            </div>
          </div>

        </div>
          <div className="flex justify-evenly">
            <p className="text-xl font-medium">Languages</p>
            <div>
              <label htmlFor="java">Java</label>
              <input type="checkbox" value={'Java'} id='java' name='java' onChange={handleLanguagesCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="javaScript">JavaScript</label>
              <input type="checkbox" value={'JavaScript'} id='javaScript' name='javaScript' onChange={handleLanguagesCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="python">Python</label>
              <input type="checkbox" value={'Python'} id='python' name='python' onChange={handleLanguagesCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="typeScript">TypeScript</label>
              <input type="checkbox" value={'TypeScript'} id='typeScript' name='typeScript' onChange={handleLanguagesCheckedBoxes}/>
            </div>
          </div>&nbsp;
          <div className="flex justify-evenly">
          <p className="text-xl font-medium">Frameworks</p>
            <div >
              <label htmlFor="flask">Flask</label>
              <input type="checkbox" value={'Flask'} id='flask' name='flask' onChange={handleFrameworksCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="django">Django</label>
              <input type="checkbox" value={'Django'} id='django' name='django' onChange={handleFrameworksCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="springBoot">SpringBoot</label>
              <input type="checkbox" value={'SpringBoot'} id='springBoot' name='springBoot' onChange={handleFrameworksCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="react">React</label>
              <input type="checkbox" value={'React'} id='react' name='react' onChange={handleFrameworksCheckedBoxes}/>
            </div>
          </div>
        </form>
      </div>
  )
}

export default SeekerRegister