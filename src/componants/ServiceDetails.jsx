import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import services from '../data/services.json';
import BookingForm from './BookingForm';
import Footer from './Footer';
import ServiceCards from './ServiceCards';
import Navbar from '../componants/Navbar'

const ServiceDetails = () => {
  const { title } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const foundService = services.find((s) => s.slug === title);
    setService(foundService);
  }, [title]);

  if (!service) return <div className="p-8 text-center text-red-500">Service not found.</div>;

  return (
    <div className='bg-gray-100'>
      <Navbar/>
      <div
        className="h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${service.backgroundImage})` }}
      >
         <div className=" h-[70vh] absolute inset-0 bg-black opacity-50 z-0"></div>

        <h1 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">{service.title}</h1>
      </div>

      <div className="bg-[#1a1a1a] text-white px-6 py-12 text-center  mx-auto">
        <h2 className="text-2xl font-semibold mb-4 ">Experience Exclusive VIP Treatment at the Airport</h2>
        <p className="text-gray-300 text-center max-w-4xl mx-auto">{service.intro}</p>
      </div>

      <div className="bg-black text-white px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-xl font-semibold mb-10">What We Offer:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-black p-6 rounded-lg border text-center border-white hover:border-[#BE965B] transition"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-40'>
      <BookingForm />
      </div>
      <div className='mt-20'>
      <ServiceCards/> 
      </div >
      <div className='mt-20'>
      <Footer/> 
      </div >
    
    </div>
  );
};

export default ServiceDetails;
