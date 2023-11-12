import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SeekerRegister = () => {
  const navigate = useNavigate()
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
    console.log(checkedLanguages)
    console.log(checkedFrameworks)
    console.log(seekerUser)



    axios
      .post('http://localhost:8000/seeker/register', seekerUser, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('currentUser', JSON.stringify(res.data))
        navigate('/seeker/dashboard')
      })
      .catch((err) => {
        console.log(err)
        // Set errors for Validations here
      })
  }

  return (
    <div>
      <h2>Register</h2>
      <div>
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' id='name' onChange={handleRegisterChange} />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" name='location' id='location' onChange={handleRegisterChange}/>
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea name="bio" id="bio" cols="30" rows="10" onChange={handleRegisterChange}></textarea>
          </div>
          <div>
            <p>Languages</p>
            <div>
              <label htmlFor="java">Java</label>
              <input type="checkbox" value={'java'} id='java' name='java' onChange={handleLanguagesCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="javaScript">JavaScript</label>
              <input type="checkbox" value={'javaScript'} id='javaScript' name='javaScript' onChange={handleLanguagesCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="python">Python</label>
              <input type="checkbox" value={'python'} id='python' name='python' onChange={handleLanguagesCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="typeScript">TypeScript</label>
              <input type="checkbox" value={'typeScript'} id='typeScript' name='typeScript' onChange={handleLanguagesCheckedBoxes}/>
            </div>
          </div>
          <div>
          <p>Frameworks</p>
            <div>
              <label htmlFor="flask">Flask</label>
              <input type="checkbox" value={'flask'} id='flask' name='flask' onChange={handleFrameworksCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="django">Django</label>
              <input type="checkbox" value={'django'} id='django' name='django' onChange={handleFrameworksCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="springBoot">SpringBoot</label>
              <input type="checkbox" value={'springBoot'} id='springBoot' name='springBoot' onChange={handleFrameworksCheckedBoxes}/>
            </div>
            <div>
              <label htmlFor="react">React</label>
              <input type="checkbox" value={'react'} id='react' name='react' onChange={handleFrameworksCheckedBoxes}/>
            </div>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id='email' name='email' onChange={handleRegisterChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id='password' name='password' onChange={handleRegisterChange} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id='confirmPassword' name='confirmPassword' onChange={handleRegisterChange} />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}

export default SeekerRegister