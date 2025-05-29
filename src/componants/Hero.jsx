import { FaLocationArrow, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { FaLocationPin, FaMapLocation } from "react-icons/fa6";
import React from "react";
import { motion } from "framer-motion";
import BookingForm from "./BookingForm";


function Hero() {
  return (
      
    <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="absolute inset-0 top-60 md:top-50 lg:top-40 flex flex-col items-center sm:items-start pt-20 text-white text-center sm:text-left px-6 sm:px-12 md:px-20 lg:px-32"
>
  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="text-5xl md:text-6xl lg:text-7xl text-center md:text-left mt-2"
  >
    A World-Class Welcome, Every Time
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    className="mt-4 text-lg max-w-2xl text-justify"
  >
    "Redefining the way you travel exclusive concierge service at key airports across the globe."
  </motion.p> 
{/* <BookingForm /> */}
</motion.div>
  

  );
}






export default function HeroSection() {
  return (
    <div className="relative w-full h-[104rem] md:h-[68rem] flex flex-col justify-center ">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/assets/airport4.jpg')" }}></div>
      <div className="absolute inset-0 bg-black opacity-65"></div>
      <Hero /> 
      <div className="pt-100 lg:pt-48">
        <BookingForm />
      </div>
 
      {/* <SearchBox /> */}
    </div>
  );
}
