import { useState } from 'react'
import React from 'react'

import './App.css'
import Home from './pages/Home'
import ServiceDetails from './componants/ServiceDetails'
import { Route, Router, Routes } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (

    
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/service/:title" element={<ServiceDetails />} />
    
     </Routes>
  
  )
}

export default App
