import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserRegister from './pages/Register' 
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewBook from './pages/NewBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={<Home />}        />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/login'    element={<Login/>}        />
        <Route path='/dashboard' element={<Dashboard />}  />
        <Route path='/book/new' element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
