import React from 'react'
import HeroSection from '../componants/Hero'
import Navbar from '../componants/Navbar'
import BookingForm from '../componants/BookingForm'
import ServiceCards from '../componants/ServiceCards'
import Slider from '../componants/Slider'
import ServiceCards2 from '../componants/ServiceCards2'
import Footer from '../componants/Footer'
import CMBServices from '../componants/CMBServices'
import TransportService from '../componants/TransportService'
import FAQSection from '../componants/FAQSection'
import AirportPage from '../componants/AirportPage'
import BlogPreview from '../componants/BlogPreview'

const Home = () => {
  return (
    <div>
        <Navbar/>
      <HeroSection/>
      {/* <BookingForm className="-mt-30 "/> */}

      {/* <Slider/> */}
      {/* <hr className=' bg-black h-1 mx-10 my-8 text-center'/> */}
      <CMBServices/>
      {/* <ServiceCards/> */}
      {/* <hr className=' bg-black h-1 mx-10 my-8 text-center'/> */}
      {/* <ServiceCards2/> */}


      {/* <TransportService/> */}
      <AirportPage/>
      <FAQSection />
  {/* <BlogPreview/> */}
      <Footer/>
    </div>
  )
}

export default Home
