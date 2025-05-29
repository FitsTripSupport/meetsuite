import React from 'react';
import { Link } from 'react-router-dom';
import services from '../data/services.json';
import ScrollFadeIn from './ScrollFadeIn';

const ServiceCards = () => {
  // Filter only Transportation Services category
  const transportationServices = services.filter(
    (service) => service.category === 'Transportation Services'
  );

  return (
    <div
      className="mx-auto px-4 py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url('/assets/logobg.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#222]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col">
        <h2 className="text-4xl font-regular mb-6 text-white">Transportation Services</h2>
        <h3 className="text-m  mb-6 text-[#ADADAD]">Seamless travel begins the moment you land. Under our new MeetSuite brand, we offer curated transportation solutions designed to ensure comfort, convenience, and reliability every step of the way. Whether you're heading to a meeting, your hotel, or the next leg of your journey, we’ve got you covered.</h3>

        <ScrollFadeIn>
        <div className="flex flex-wrap justify-center gap-6">
          {transportationServices.map((service, index) => (
            <Link
              to={`/service/${encodeURIComponent(service.slug)}`}
              key={index}
              className="bg-[#f8f5f0] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition w-92   "
            >
              <img
                src={service.backgroundImage}
                alt={service.title}
                className="w-92 h-44 object-cover"
              />
              <div className="p-4 text-[#222] group">
  <h3 className="font-medium text-sm">{service.title}</h3>

  <p className="text-xs text-[#666666] mt-1 text-justify">
    <span className="block group-hover:hidden">
      {service.intro.slice(0, 60)}{service.intro.length > 60 ? '...' : ''}
    </span>
    <span className="hidden group-hover:block">
      {service.intro}
    </span>
  </p>

  <span className="text-sm text-[#aa8453] font-medium mt-3 inline-flex items-center gap-1 hover:underline">
    Explore more →
  </span>
</div>
            </Link>
          ))}
        </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default ServiceCards;
