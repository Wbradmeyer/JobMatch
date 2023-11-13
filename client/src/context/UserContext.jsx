import {createContext, useEffect, useState} from 'react'

export const userContext = createContext({
  currentUser: {
    _id: '',
    name: '',
    email: '',
    location: '',
    bio: '',
    languages: [],
    frameworks: []
  },
  setCurrentUser: () => {}
})

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    email: '',
    location: '',
    bio: '',
    languages: [],
    frameworks: []
  });

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      // console.log(localStorage.getItem('currentUser'))
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    }
  },['currentUser'])

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser}}>
      {props.children}
    </userContext.Provider>
  )
}