import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import type { ReactNode } from 'react'
import { isAuthenticated } from './api/client'
import Home from './pages/Home'
import UserRegister from './pages/Register' 
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewBook from './pages/NewBook'

function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'         element={<Home />}        />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/login'    element={<Login/>}        />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}  />
        <Route path='/book/new' element={<ProtectedRoute><NewBook /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
