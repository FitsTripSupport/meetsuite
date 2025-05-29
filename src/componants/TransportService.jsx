import React from 'react';
import TransportCard from './TransportCard';
import services from '../data/services.json';
import ScrollFadeIn from './ScrollFadeIn';

const TransportService = () => {
 

  return (
    <div className="bg-[#eee7db] min-h-screen py-12 px-4">
      <h2 className="text-4xl font-serif font-semibold text-gray-900 text-center mb-12">
       Transportation Services
      </h2>

      <ScrollFadeIn>
       <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 p-6">
      {services.map((item, index) => (
        <TransportCard
          key={index}
          image={item.backgroundImage}
         
          title={item.title}
          description={item.intro}
        />
      ))}
    </div>
    </ScrollFadeIn>
    </div>
  );
};

export default TransportService;
