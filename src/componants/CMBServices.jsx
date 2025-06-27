import React, { useState } from 'react';
import cmbServices  from '../../src/cmbServices.json';
import { FaCheckCircle } from 'react-icons/fa';


const countryFlags = {
  "Sri Lanka": "🇱🇰",
  "UAE": "🇦🇪",
  "India": "🇮🇳"
};

const CMBServices = () => {
  const countries = Object.keys(cmbServices);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <section
  className="bg-[#f8f5f0] py-12 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url('/asset/airport.jpg')` }}
  id="services" name="services"
>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-left mb-6 text-[#000]">Meetsuite Experience</h2>

        {/* Country Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => handleCountryClick(country)}
              className={`px-4 py-2 rounded-md w-32 border font-semibold cursor-pointer transition ${
                selectedCountry === country
                  ? 'bg-[#000] text-[#BE965B]'
                  : 'bg-white text-[#BE965B] border-[#000]'
              }`}
            >
              {/* <span className="mr-2">{countryFlags[country]}</span> */}
              {country}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cmbServices [selectedCountry].map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#f6e27a] to-[#c49b3d] hover:from-[#c49b3d] hover:to-[#f6e27a] rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-4">
                {/* <p className="text-sm text-white font-medium">{service.provider}</p> */}
                <h3 className="text-xl font-bold text-[#000]">{service.package}</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#000] mb-4">
                {service.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start">
                    {/* Optional: <FaCheckCircle className="text-white mt-1 mr-2 w-5 h-5" /> */}
                    <span>&bull; {item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-right font-bold text-[#002366] text-lg bottom-4">
                {/* {service.price} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CMBServices;
