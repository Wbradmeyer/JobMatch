import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SeekerRegister from './components/SeekerRegister'

function App() {

  return (
    <div>
    <h1>Job Search</h1>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/seekerRegister' element={<SeekerRegister/>}/>
    </Routes>
    </div>
  )
}

export default App
