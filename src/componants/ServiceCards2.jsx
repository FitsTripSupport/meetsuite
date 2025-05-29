import React from 'react';
import { Link } from 'react-router-dom';
import services from '../data/services.json';
import ScrollFadeIn from './ScrollFadeIn';

const ServiceCards2 = () => {
  // Filter services by "Baggage Services" category
  const baggageServices = services.filter(
    (service) => service.category === 'Baggage Services'
  );

  return (
    <div className="relative w-full">
      {/* Blue background with image */}
      <div
        className="relative w-full min-h-[300px] flex items-center"
        style={{
          backgroundColor: '#000036',
          backgroundImage: "url('/assets/worldline.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#000036] opacity-50" />
        <h2 className="relative -mt-24 text-white text-xl sm:text-2xl font-bold z-10 px-12 md:px-32">
          Baggage Services
        </h2>
      </div>

      <ScrollFadeIn>
      {/* Cards overlapping */}
      <div className="relative -mt-40 px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-wrap justify-center gap-6">
          {baggageServices.map((service, index) => (
            <Link
              to={`/service/${encodeURIComponent(service.slug)}`}
              key={index}
              className="bg-[#000036] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition w-72"
            >
              <img src={service.backgroundImage} alt={service.title} className="w-full h-40 object-cover" />
              <div className="p-4 text-white">
                <h3 className="font-semibold text-sm">{service.title}</h3>
                <p className="text-xs text-gray-300 mt-1">{service.intro.slice(0, 60)}...</p>
                <span className="text-sm text-white font-medium mt-3 inline-flex items-center gap-1 hover:underline">
                  Explore more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </ScrollFadeIn>
    </div>
  );
};

export default ServiceCards2;
