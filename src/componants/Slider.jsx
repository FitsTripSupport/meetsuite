import React, { useState, useEffect } from 'react';

const CardData = [
  { title: 'Airport by Invitation', description: 'Protect your bags...', imageUrl: '/assets/airport.jpg', link: '#' },
  { title: 'Meet & Assist', description: 'Protect your bags...', imageUrl: '/assets/airport.jpg', link: '#' },
  { title: 'Fast Track', description: 'Protect your bags...', imageUrl: '/assets/airport.jpg', link: '#' },
  { title: 'Lounge Access', description: 'Protect your bags...', imageUrl: '/assets/airport.jpg', link: '#' },
  { title: 'Another Service', description: 'Another card.', imageUrl: '/assets/airport.jpg', link: '#' },
  { title: 'Yet Another One', description: 'More cards.', imageUrl: '/assets/airport.jpg', link: '#' },
];

const CardSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsToShow(1);
      else if (width < 768) setCardsToShow(2);
      else if (width < 1024) setCardsToShow(3);
      else setCardsToShow(4);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const maxStartIndex = CardData.length - cardsToShow;
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = startIndex >= maxStartIndex;

  const goNext = () => {
    if (!isNextDisabled) setStartIndex(prev => prev + 1);
  };

  const goPrevious = () => {
    if (!isPrevDisabled) setStartIndex(prev => prev - 1);
  };

  return (
    <div className="relative bg-white">
      {/* Overlay image (like a watermark or artistic element) */}
      <img
        src="/assets/fts-map2.png" // 🔁 Replace this with your actual overlay image path
        alt="Decorative overlay"
        className="absolute inset-0 w-full h-full  opacity-20 z-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Airport Assistance & VIP Services</h2>
          <div className="flex items-center space-x-2">
            {/* Navigation Buttons */}
            <button
              onClick={goPrevious}
              disabled={isPrevDisabled}
              className={`group bg-gray-200 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isPrevDisabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
              }`}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={isNextDisabled}
              className={`group bg-gray-200 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isNextDisabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'
              }`}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
  
        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(CardData.length * 100) / cardsToShow}%`,
              transform: `translateX(-${(100 / CardData.length) * startIndex}%)`,
            }}
          >
            {CardData.map((card, index) => (
              <div
                key={index}
                className="p-2"
                style={{
                  width: `${100 / CardData.length}%`,
                  flexShrink: 0,
                }}
              >
                <div className="bg-[#fdf7f1] rounded-md shadow-md h-full flex flex-col">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full object-cover rounded-t-md"
                    style={{ height: '150px' }}
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{card.description}</p>
                    <a href={card.link} className="text-indigo-500 font-medium text-sm mt-auto flex items-center">
                      Explore more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default CardSlider;
