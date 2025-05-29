import React from 'react';

const TransportCard = ({ image, title,description }) => {
  return (
    <div className="relative group overflow-hidden rounded-md shadow-md">
      <img src={image} alt={title} className="w-full h-[500px] object-cover" />
      
       {/* Black overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent  pointer-events-none"></div>

       {/* Bottom content container */}
      <div className="absolute bottom-0 left-0 w-full  p-6 transition-all  duration-500 group-hover:translate-y-[-120px]">
       
        <h3 className="text-2xl font-serif text-white">{title}</h3>
      </div>

      {/* Description on hover */}
      <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <p className="text-sm text-white max-w-sm">{description}</p>
      </div>
    </div>
  );
};

export default TransportCard;
