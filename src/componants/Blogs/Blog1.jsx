import React from "react";
import Navbar from "../Navbar";
import BlogPreview from "../BlogPreview";
import { Link } from "react-router-dom";
const Blog1 = () => (
    <>
    
 


<Navbar/>
   {/* Hero Section */}
<section className="relative w-full h-[55vh] md:h-[55vh] flex items-center justify-center bg-cover bg-top text-white overflow-hidden">
        {/* Background Image with Zoom Animation */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-[#222]"
          
        ></div>


  {/* Content */}
  <div className="relative p-6 text-center rounded-lg">
    
    <h1 className="text-2xl md:text-4xl font-bold mt-2">Blog Title 1</h1>
  </div>
</section>

 <div className="bg-black text-white min-h-screen py-10 px-6">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Blog sub-Title 1</h1>
      <img src="/assets/airport.jpg" alt="blog" className="rounded mb-6 w-full h-80 object-cover" />
      <p className="text-gray-300 text-lg">
        Full content of Blog 1 goes here...
      </p>
    </div>
  </div>


{/* backbutton */}
<div className="py-10 bg-black items-center text-center">
        <Link to="/blogpage">
        <button className="bg-[#BE965B] text-black border px-6 py-2 rounded-md font-semibold hover:bg-[#222222] hover:text-[#BE965B] hover:border transition duration-300">
  Go Back
</button>
</Link>
      </div>


  <BlogPreview/>
  </>
);

export default Blog1;
