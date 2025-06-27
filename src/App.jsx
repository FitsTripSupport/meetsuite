import { useState } from 'react'
import React from 'react'

import './App.css'
import Home from './pages/Home'
import ServiceDetails from './componants/ServiceDetails'
import { Route, Router, Routes } from 'react-router-dom'
import BlogPage from './componants/BlogPage'
import Blog1 from './componants/Blogs/Blog1'


function App() {
  const [count, setCount] = useState(0)

  return (

    
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/blogpage" element={<BlogPage/>} />
       <Route path="/service/:title" element={<ServiceDetails />} />
     <Route path="/blogpage/blog1" element={<Blog1 />} />
     </Routes>
  
  )
}

export default App
