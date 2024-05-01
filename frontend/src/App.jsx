import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'

import Profile from './components/Profile'
import Signin from './components/Signin'
import Signup from './components/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/profile' element={<h2>No User found</h2>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
