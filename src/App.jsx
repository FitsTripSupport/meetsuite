import React, {useState} from 'react'

import './App.css'
import Home from './pages/Home'
import ServiceDetails from './componants/ServiceDetails'
import {Route, Routes} from 'react-router-dom'
import BlogPage from './componants/BlogPage'
import Blog1 from './componants/Blogs/Blog1'
import PaymentSuccess from "./pages/PaymentSuccess.jsx";


function App() {
    const [count, setCount] = useState(0)

    return (


        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/blogpage" element={<BlogPage/>}/>
            <Route path="/service/:title" element={<ServiceDetails/>}/>
            <Route path="/blogpage/blog1" element={<Blog1/>}/>
            <Route path="/payment-success" element={<PaymentSuccess/>}/>
        </Routes>

    )
}

export default App
