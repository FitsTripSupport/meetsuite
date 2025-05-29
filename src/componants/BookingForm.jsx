import React, { useState, useRef, useEffect } from 'react';
import ScrollFadeIn from './ScrollFadeIn';
import { FaCalendarAlt, FaTimes, FaWhatsapp } from 'react-icons/fa';

const BookingForm = () => {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [baggageDropdownOpen, setBaggageDropdownOpen] = useState(false);
  const [baggageCount, setBaggageCount] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [tripType, setTripType] = useState('Departure');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAirportCode, setSelectedAirportCode] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    flightNumber: '',
    travelDate: '',
    transitDetails: '',
  });
  const [formStatus, setFormStatus] = useState({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const guestDropdownRef = useRef(null);
  const baggageDropdownRef = useRef(null);

  const airportNames = {
    CMB: "CMB - Colombo Bandaranaike International Airport",
    HRI: "HRI - Mattala Rajapaksa International Airport",
    JAF: "JAF - Jaffna International Airport",
    DXB: "DXB - Dubai International Airport",
    DWC: "DWC - Al Maktoum International Airport",
    SHJ: "SHJ - Sharjah International Airport",
    MLE: "MLE - Velana International Airport"
  };

  const airportsByCountry = {
    'Sri Lanka': ['CMB'],
    'Maldives': ['MLE'],
  };

  const servicesByAirport = {
    CMB: [
      {
        package: 'MeetSuite Elite',
        description: `- Personalised Meet & Greet at arrival terminal
- Dedicated assistance with immigration, customs & check-in
- Exclusive Elite Lounge access (refreshments + Wi-Fi)
- Direct transfer to the private vehicle from the lounge`,
        price: '$250 per person',
      },
      {
        package: 'MeetSuite Prestige',
        description: `- Arrival and Departure Meet & Greet
- Fast-track immigration both ways
- Executive Lounge access with refreshments, concierge, and Wi-Fi
- Personal escort throughout both legs
- Children under 2 years free`,
        price: '$240 per person',
      },
      {
        package: 'MeetSuite Express',
        description: `- Arrival & Departure assistance
- Meet & Greet with fast-track immigration
- Baggage handling support
- No lounge access
- Children under 2 years free`,
        price: '$120 per person',
      },
      {
        package: 'MeetSuite Horizon Welcome',
        description: `- Meet & Greet upon landing
- Fast-track through immigration
- Escort to baggage claim and exit
- Children under 2 years free`,
        price: '$75 per person',
      },
      {
        package: 'MeetSuite Horizon Farewell',
        description: `- Meet & Greet at the departure terminal
- Fast-track check-in, security & immigration
- Escort to the gate
- Children under 2 years free`,
        price: '$75 per person',
      },
    ],
    HRI: [
      {
        package: 'Meet & Assist',
        description: 'Assistance from arrival to exit or boarding.',
        price: '$100',
      },
      {
        package: 'Car Transfer',
        description: 'Private car service to/from the airport.',
        price: '$80',
      },
    ],
    JAF: [
      {
        package: 'Meet & Assist',
        description: 'Basic assistance with arrival/departure procedures.',
        price: '$90',
      },
    ],
    MLE: [
      {
        package: 'MeetSuite Elite',
        description: `- Personalised Meet & Greet at arrival terminal
- Dedicated assistance with immigration, customs & check-in
- Lounge access
- Direct transfer to private vehicle from the lounge`,
        price: '$285',
      },
      {
        package: 'MeetSuite Express',
        description: `- Arrival assistance
- Meet & Greet with fast-track immigration
- Baggage handling support
- No lounge access
- Children under 2 years free`,
        price: '$85',
      },
      {
        package: 'MeetSuite Express Departure',
        description: `- Departure assistance
- Meet & Greet with fast-track immigration
- Baggage handling support
- No lounge access
- Children under 2 years free`,
        price: '$85',
      },
    ],
    DWC: [
      {
        package: 'Meet & Assist',
        description: 'Airport guidance and fast-track services.',
        price: '$110',
      },
      {
        package: 'Lounge Access',
        description: 'Comfortable waiting area with refreshments.',
        price: '$90',
      },
    ],
    SHJ: [
      {
        package: 'Meet & Assist',
        description: 'Full escort through airport formalities.',
        price: '$100',
      },
      {
        package: 'Shopper Service',
        description: 'Guided shopping assistance with discounts.',
        price: '$60',
      },
    ],
  };

  const handleClickOutside = (e) => {
    if (guestDropdownRef.current && !guestDropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
    if (baggageDropdownRef.current && !baggageDropdownRef.current.contains(e.target)) {
      setBaggageDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIncrement = (type) => {
    setGuests((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ message: '', isError: false });
    setIsLoading(true); // Start loading

    const payload = {
      tripType,
      country: selectedCountry,
      airportCode: selectedAirportCode,
      service: selectedService,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      guests,
      baggageCount,
      flightNumber: formData.flightNumber,
      travelDate: formData.travelDate,
      transitDetails: formData.transitDetails,
    };

    try {
      const response = await fetch('https://api.meetsuite.io/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        setFormStatus({ message: result.message, isError: false });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          whatsapp: '',
          flightNumber: '',
          travelDate: '',
          transitDetails: '',
        });
        setGuests({ adults: 1, children: 0, infants: 0 });
        setBaggageCount(1);
        setSelectedCountry('');
        setSelectedAirportCode('');
        setSelectedService('');
        setTripType('');
      } else {
        setFormStatus({ message: result.error || 'Failed to submit booking', isError: true });
      }
    } catch (error) {
      setFormStatus({ message: 'Error connecting to server', isError: true });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const guestSummary = `${guests.adults} Adult${guests.adults !== 1 ? 's' : ''}, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}, ${guests.infants} Infant${guests.infants !== 1 ? 's' : ''}`;

  
  return (
    <ScrollFadeIn>
      <div className="bg-transparent backdrop-blur-xl rounded-xl shadow-md w-full max-w-[90%] md:max-w-[48rem] lg:max-w-[72rem] xl:max-w-[80rem] mx-auto mt-30 relative z-10">
        <div className="bg-[#BE965B] pt-4 pb-4 rounded-t-xl text-white text-center">
          <h2 className="text-center text-xl md:text-2xl font-medium text-white uppercase">
            GET YOUR MEETSUITE QUOTE NOW
          </h2>
        </div>

        <div className="flex justify-center gap-4 mt-6 mb-6 flex-wrap">
          {['Departure', 'Arrival', 'Transit'].map((type) => (
            <label key={type} className="flex items-center gap-2 text-m font-medium text-white">
              <input
                type="radio"
                name="tripType"
                className="accent-[#0d0c3b]"
                value={type}
                onChange={(e) => setTripType(e.target.value)}
                checked={tripType === type}
              />
              {type}
            </label>
          ))}
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 text-white" onSubmit={handleSubmit}>
          <select
            className="w-full border rounded-md p-2 "
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedAirportCode('');
              setSelectedService('');
            }}
            required
          >
            <option value="" className='bg-black'>Select Country</option>
            {Object.keys(airportsByCountry).map((country) => (
              <option key={country} value={country} className='bg-black'>{country}</option>
            ))}
          </select>

          <select
            className="w-full border rounded-md p-2"
            value={selectedAirportCode}
            onChange={(e) => {
              setSelectedAirportCode(e.target.value);
              setSelectedService('');
            }}
            disabled={!selectedCountry}
            required
          >
            <option value="" className='bg-black'>
              {selectedCountry ? 'Select Airport' : 'Select a country first'}
            </option>
            {selectedCountry &&
              airportsByCountry[selectedCountry].map((airportCode) => (
                <option key={airportCode} value={airportCode} className='bg-black'>
                  {airportNames[airportCode]}
                </option>
              ))}
          </select>

          <div className="relative">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="w-full border rounded-md p-2 text-left"
              disabled={!selectedAirportCode}
              required
            >
              {selectedService || (selectedAirportCode ? 'Select Service' : 'Select an airport first')}
            </button>
          </div>

          {modalOpen && (
            <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-4xl w-full shadow-lg rounded-xl p-6 relative">
                <button
                  className="absolute top-2 right-4 text-xl font-bold text-[#000] hover:text-[#BE965B] transition"
                  onClick={() => setModalOpen(false)}
                >
                  <FaTimes className="text-2xl" />
                </button>
                <h3 className="text-xl font-semibold mb-4 text-center text-[#000]">
                  Select a Service
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                  {(servicesByAirport[selectedAirportCode] || []).map((service, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-xl p-4 transition shadow-lg text-white hover:scale-101 hover:shadow-2xl duration-200 ${
                        selectedService === service.package ? 'ring-1 ring-[#e4b343]' : ''
                      }`}
                      style={{
                        background:
                          selectedService === service.package
                            ? 'linear-gradient(135deg, #e4b343, #0d0c3b)'
                            : '#af9146',
                      }}
                      onClick={() => {
                        setSelectedService(service.package);
                        setModalOpen(false);
                      }}
                      required
                    >
                      <div className="font-bold text-black">{service.package}</div>
                      {service.description && (
                        <div className="text-sm mt-1 space-y-1">
                          {service.description.split('\n').map((line, i) => (
                            <p key={i}>• {line.replace(/^[-•]\s*/, '')}</p>
                          ))}
                        </div>
                      )}
                      {service.price && (
                        <div className="font-semibold mt-4 bottom-5 text-black">Price: {service.price}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full border rounded-md p-2 "
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full border rounded-md p-2"
            required
          />

          <div className="relative w-full" ref={guestDropdownRef}>
            <div
              className="border rounded-md p-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {guestSummary}
            </div>
            {dropdownOpen && (
              <div className="absolute z-50 bg-black shadow-lg rounded-md p-4 mt-1 w-full">
                {[
                  { label: 'Adult(s)', subtitle: '(12 years+)', key: 'adults' },
                  { label: 'Child', subtitle: '(2 - 12 years)', key: 'children' },
                  { label: 'Infant', subtitle: '(Below 2 years)', key: 'infants' },
                ].map(({ label, subtitle, key }) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <div>
                      <span className="font-medium">{label}</span>
                      <span className="text-gray-500 ml-1 text-sm">{subtitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrement(key)}
                        className="bg-black-200 hover:bg-[#BE965B] w-8 h-8 rounded-full border border-1-white text-lg"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{guests[key]}</span>
                      <button
                        type="button"
                        onClick={() => handleIncrement(key)}
                        className="bg-black-200 hover:bg-[#BE965B] w-8 h-8 rounded-full border border-1-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full border rounded-md p-2 pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">📞</span>
          </div>

          <div className="relative">
            <input
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="Whatsapp"
              className="w-full border rounded-md p-2 pl-10"
            />
            <span className="absolute left-3 top-2.5 text-green-500 text-xl"><FaWhatsapp/></span>
          </div>

          <div className="relative w-full" ref={baggageDropdownRef}>
            <div
              className="border rounded-md p-2 cursor-pointer"
              onClick={() => setBaggageDropdownOpen(!baggageDropdownOpen)}
            >
              {baggageCount} Bag{baggageCount !== 1 ? 's' : ''}
            </div>
            {baggageDropdownOpen && (
              <div className="absolute z-50 bg-black shadow-lg rounded-md p-4 mt-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Number of Bags</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBaggageCount(Math.max(1, baggageCount - 1))}
                      className="bg-black-200 hover:bg-[#BE965B] w-8 h-8 rounded-full border border-1-white text-lg"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{baggageCount}</span>
                    <button
                      type="button"
                      onClick={() => setBaggageCount(baggageCount + 1)}
                      className="bg-black-200 hover:bg-[#BE965B] w-8 h-8 rounded-full border border-1-white text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            name="flightNumber"
            value={formData.flightNumber}
            onChange={handleInputChange}
            placeholder="Enter Your Flight Number e.g. UA918"
            className="w-full border rounded-md p-2"
          />

          <div className="relative w-full">
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleInputChange}
            placeholder="Travel Date"
            className="w-full border rounded-md p-2 "
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
          </div>

          {tripType === 'Transit' && (
            <input
              type="text"
              name="transitDetails"
              value={formData.transitDetails}
              onChange={handleInputChange}
              placeholder="Transit Duration or City"
              className="w-full border rounded-md p-2"
            />
          )}

          <div className="flex justify-center items-center pb-6 col-span-full flex-col">
  <button
    type="submit"
    className={`w-80 md:w-100 text-white px-6 py-2 rounded-md hover:scale-105 transition cursor-pointer flex items-center justify-center ${
      isLoading ? 'bg-[#BE965B]/70 cursor-not-allowed' : 'bg-[#BE965B]'
    }`}
    disabled={isLoading}
  >
    {isLoading ? (
      <>
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Processing...
      </>
    ) : (
      'BOOK NOW'
    )}
  </button>
  {formStatus.message && (
    <p className={`mt-4 ${formStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
      {formStatus.message}
    </p>
  )}
</div>
        </form>
      </div>
    </ScrollFadeIn>
  );
};

export default BookingForm;

