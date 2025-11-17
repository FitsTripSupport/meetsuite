import React, { useState, useRef } from 'react';
import ScrollFadeIn from './ScrollFadeIn';
import { FaCalendarAlt, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { useCountries, useAirports, usePackagesByAirport } from '../hooks/useMeetSuiteLocations';
import useCheckoutScript from "../hooks/useCheckoutScript.js";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const BookingForm = () => {
  const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [baggageDropdownOpen, setBaggageDropdownOpen] = useState(false);
  const [baggageCount, setBaggageCount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [tripType, setTripType] = useState('Departure');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAirportCode, setSelectedAirportCode] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null); // backend package
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    flightNumber: '',
    travelDate: '',
    transitDetails: '',
    comments: '',
  });
  const [formStatus, setFormStatus] = useState({ message: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  // const [recaptchaToken, setRecaptchaToken] = useState(null);

  const guestDropdownRef = useRef(null);
  const baggageDropdownRef = useRef(null);
  // const recaptchaRef = useRef(null);

  const [paymentMethod, setPaymentMethod] = useState("MASTERCARD_CHECKOUT");
  const checkoutReady = useCheckoutScript();

  // For nicer display; backend still only sends codes
  const airportNames = {
    CMB: 'CMB - Colombo Bandaranaike International Airport',
    HRI: 'HRI - Mattala Rajapaksa International Airport',
    JAF: 'JAF - Jaffna International Airport',
    DXB: 'DXB - Dubai International Airport',
    DWC: 'DWC - Al Maktoum International Airport',
    SHJ: 'SHJ - Sharjah International Airport',
    MLE: 'MLE - Velana International Airport',
  };

  // 🔹 Hooks using your backend endpoints
  const {
    countries,
    loading: loadingCountries,
    error: countriesError,
  } = useCountries();

  const {
    airports,
    loading: loadingAirports,
    error: airportsError,
  } = useAirports(selectedCountry);

  const {
    packages,
    loading: loadingPackages,
    error: packagesError,
  } = usePackagesByAirport(selectedCountry, selectedAirportCode);

  // const handleClickOutside = (e) => {
  //   if (guestDropdownRef.current && !guestDropdownRef.current.contains(e.target)) {
  //     setDropdownOpen(false);
  //   }
  //   if (baggageDropdownRef.current && !baggageDropdownRef.current.contains(e.target)) {
  //     setBaggageDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   const loadRecaptcha = () => {
  //     if (!window.grecaptcha) {
  //       const script = document.createElement('script');
  //       script.src = 'https://www.google.com/recaptcha/api.js';
  //       script.async = true;
  //       script.onload = () => {
  //         console.log('reCAPTCHA script loaded');
  //       };
  //       script.onerror = () => {
  //         console.error('Failed to load reCAPTCHA script');
  //       };
  //       document.body.appendChild(script);
  //     }
  //   };
  //
  //   loadRecaptcha();
  //
  //   // const handleRecaptchaEvent = (event) => {
  //   //   console.log('reCAPTCHA token:', event.detail);
  //   //   setRecaptchaToken(event.detail);
  //   // };
  //   // document.addEventListener('recaptchaCallback', handleRecaptchaEvent);
  //   document.addEventListener('mousedown', handleClickOutside);
  //
  //   return () => {
  //     // document.removeEventListener('recaptchaCallback', handleRecaptchaEvent);
  //     document.removeEventListener('mousedown', handleClickOutside);
  //     const script = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
  //     if (script) {
  //       document.body.removeChild(script);
  //     }
  //   };
  // }, []);
  //
  // const resetRecaptcha = () => {
  //   if (window.grecaptcha && recaptchaRef.current) {
  //     window.grecaptcha.reset();
  //     setRecaptchaToken(null);
  //   }
  // };

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
    setFormStatus({ message: "", isError: false });
    setIsLoading(true);

    // if (!recaptchaToken) {
    //   setFormStatus({ message: "Please complete the reCAPTCHA", isError: true });
    //   setIsLoading(false);
    //   return;
    // }

    if (!API_BASE_URL) {
      setFormStatus({ message: "Backend URL not configured", isError: true });
      setIsLoading(false);
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.whatsapp,     // or add a separate phone field
      whatsapp: formData.whatsapp,

      serviceType: tripType?.toUpperCase(), // "DEPARTURE" / "ARRIVAL" / "TRANSIT"
      country: selectedCountry,
      airportCode: selectedAirportCode,
      service: "MEET_AND_GREET",     // match enum/string used in backend

      flightNumber: formData.flightNumber,
      flightDateTime: formData.travelDate
          ? new Date(formData.travelDate).toISOString()
          : null,

      baggageCount: String(baggageCount),

      guests,
      numberOfPassengers: guests.adults + guests.children + guests.infants,
      totalPrice: 1500.0, // TODO: derive from selected package

      packageId: 1, // TODO: set from selected package once you hook packages API

      passengers: [
        {
          fullName: formData.name,
          nationality: "Sri Lankan", // or add field to form
          passportNumber: "P9999999", // or add field to form
        },
      ],

      paymentMethod, // "OFFLINE" or "MASTERCARD_CHECKOUT"
      userId: null,
      comments: formData.comments,
      // recaptchaToken,
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/bookings`, payload);
      const data = res.data;

      // Always show message & clear form
      setFormStatus({ message: data.message || "Booking created", isError: false });

      // If OFFLINE → done here
      if (paymentMethod === "OFFLINE") {
        setIsLoading(false);
        // resetRecaptcha();
        // clear form as you do now...
        return;
      }

      // If card → initialize MPGS Checkout
      if (paymentMethod === "MASTERCARD_CHECKOUT") {
        const { sessionId, successIndicator, requestId } = data;

        if (!sessionId || !successIndicator || !requestId) {
          setFormStatus({
            message: "Failed to initiate card payment session",
            isError: true,
          });
          setIsLoading(false);
          // resetRecaptcha();
          return;
        }

        if (!checkoutReady || !window.Checkout) {
          setFormStatus({
            message: "Payment library not ready. Please try again.",
            isError: true,
          });
          setIsLoading(false);
          // resetRecaptcha();
          return;
        }

        // Store info for the PaymentSuccess page
        sessionStorage.setItem("meet_success_indicator", successIndicator);
        sessionStorage.setItem("meet_order_id", requestId);
        sessionStorage.setItem("meet_amount", String(payload.totalPrice));
        sessionStorage.setItem("meet_email", payload.email);

        // Configure Checkout – returnUrl is already set from backend createSession
        window.Checkout.configure({
          session: { id: sessionId },
          interaction: {
            displayControl: {
              billingAddress: "HIDE",
              customerEmail: "HIDE",
              orderSummary: "SHOW",
              shipping: "HIDE",
            },
          },
          error: (e) => console.error("Payment Error", e),
          cancel: () => console.log("Payment Canceled"),
          complete: (resultIndicator, sessionVersion) => {
            console.log("Payment Completed", resultIndicator, sessionVersion);
            // MPGS will redirect to returnUrl with ?resultIndicator=...
          },
        });

        window.Checkout.showLightbox();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        message: "Error connecting to server or creating booking",
        isError: true,
      });
    } finally {
      setIsLoading(false);
      // resetRecaptcha();
    }
  };

  const guestSummary = `${guests.adults} Adult${guests.adults !== 1 ? 's' : ''}, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}, ${guests.infants} Infant${guests.infants !== 1 ? 's' : ''}`;

  const selectedServiceLabel = selectedPackage ? selectedPackage.packageName : '';

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
                      required
                  />
                  {type}
                </label>
            ))}
          </div>

          <form
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 text-white"
              onSubmit={handleSubmit}
          >
            {/* Country dropdown – from backend */}
            <select
                className="w-full border rounded-md p-2"
                value={selectedCountry}
                onChange={(e) => {
                  const country = e.target.value;
                  setSelectedCountry(country);
                  setSelectedAirportCode('');
                  setSelectedPackage(null);
                }}
                required
            >
              <option value="" className="bg-black">
                {loadingCountries ? 'Loading countries...' : 'Select Country'}
              </option>
              {countries.map((country) => (
                  <option key={country} value={country} className="bg-black">
                    {country}
                  </option>
              ))}
            </select>
            {countriesError && (
                <p className="text-red-400 text-sm col-span-full">Error: {countriesError}</p>
            )}

            {/* Airport dropdown – from backend */}
            <select
                className="w-full border rounded-md p-2"
                value={selectedAirportCode}
                onChange={(e) => {
                  setSelectedAirportCode(e.target.value);
                  setSelectedPackage(null);
                }}
                disabled={!selectedCountry || loadingAirports}
                required
            >
              <option value="" className="bg-black">
                {!selectedCountry
                    ? 'Select Airport (Select a country first)'
                    : loadingAirports
                        ? 'Loading airports...'
                        : 'Select Airport'}
              </option>
              {airports.map((airportCode) => (
                  <option key={airportCode} value={airportCode} className="bg-black">
                    {airportNames[airportCode] || airportCode}
                  </option>
              ))}
            </select>
            {airportsError && (
                <p className="text-red-400 text-sm col-span-full">Error: {airportsError}</p>
            )}

            {/* Service selection (packages) */}
            <div className="relative">
              <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full border rounded-md p-2 text-left"
                  disabled={!selectedAirportCode || loadingPackages}
              >
                {selectedServiceLabel ||
                    (selectedAirportCode
                        ? loadingPackages
                            ? 'Loading services...'
                            : 'Select Service'
                        : 'Select services (Select an airport first)')}
              </button>
            </div>

            {/* Modal for package selection */}
            {modalOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
                  <div className="bg-white max-w-4xl w-full shadow-lg rounded-xl p-6 relative">
                    <button
                        className="absolute top-2 right-4 text-xl font-bold text-[#000] hover:text-[#BE965B] transition"
                        onClick={() => setModalOpen(false)}
                        type="button"
                    >
                      <FaTimes className="text-2xl"/>
                    </button>
                    <h3 className="text-xl font-semibold mb-4 text-center text-[#000]">
                      Select a Service
                    </h3>

                    {packagesError && (
                        <p className="text-red-500 text-center mb-4">
                          Error loading services: {packagesError}
                        </p>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
                      {(packages || []).map((pkg) => {
                        const descriptionLines = (pkg.inclusions || []).map(
                            (incl) => incl.detail
                        );
                        const description = descriptionLines.join('\n');
                        const priceText = pkg.price ? `USD ${pkg.price}` : '';

                        return (
                            <div
                                key={pkg.id}
                                className={`cursor-pointer rounded-xl p-4 transition shadow-lg text-white hover:scale-101 hover:shadow-2xl duration-200 ${
                                    selectedPackage?.id === pkg.id ? 'ring-1 ring-[#e4b343]' : ''
                                }`}
                                style={{
                                  background:
                                      selectedPackage?.id === pkg.id
                                          ? 'linear-gradient(135deg, #e4b343, #0d0c3b)'
                                          : '#af9146',
                                }}
                                onClick={() => {
                                  setSelectedPackage(pkg);
                                  setModalOpen(false);
                                }}
                            >
                              <div className="font-bold text-black">{pkg.packageName}</div>
                              {pkg.provider && (
                                  <div className="text-xs text-black/70 mb-1">
                                    Provider: {pkg.provider}
                                  </div>
                              )}
                              {description && (
                                  <div className="text-sm mt-1 space-y-1 text-black">
                                    {description.split('\n').map((line, i) => (
                                        <p key={i}>• {line.replace(/^[-•]\s*/, '')}</p>
                                    ))}
                                  </div>
                              )}
                              {priceText && (
                                  <div className="font-semibold mt-4 bottom-5 text-black">
                                    Price: {priceText}
                                  </div>
                              )}
                            </div>
                        );
                      })}
                      {!loadingPackages && packages.length === 0 && (
                          <p className="text-center text-gray-500 col-span-full">
                            No services found for this airport yet.
                          </p>
                      )}
                    </div>
                  </div>
                </div>
            )}

            {/* Name */}
            <div className="relative">
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full border rounded-md p-2"
                  required
              />
            </div>

            {/* Email */}
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border rounded-md p-2"
                required
            />

            {/* Travel Date */}
            <div className="relative w-full">
              <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  placeholder="Travel Date"
                  className="w-full border rounded-md p-2"
                  required
              />
              <FaCalendarAlt
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none"/>
            </div>

            {/* WhatsApp */}
            <div className="relative">
              <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="Whatsapp"
                  className="w-full border rounded-md p-2 pl-10"
                  required
              />
              <span className="absolute left-3 top-2.5 text-green-500 text-xl">
              <FaWhatsapp/>
            </span>
            </div>

            {/* Flight Number */}
            <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleInputChange}
                placeholder="Enter Your Flight Number e.g. UA918"
                className="w-full border rounded-md p-2"
                required
            />

            {/* Guests */}
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
                      {label: 'Adult(s)', subtitle: '(12 years+)', key: 'adults'},
                      {label: 'Child', subtitle: '(2 - 12 years)', key: 'children'},
                      {label: 'Infant', subtitle: '(Below 2 years)', key: 'infants'},
                    ].map(({label, subtitle, key}) => (
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

            {/* Baggage */}
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

            {/* Transit details */}
            {tripType === 'Transit' && (
                <input
                    type="text"
                    name="transitDetails"
                    value={formData.transitDetails}
                    onChange={handleInputChange}
                    placeholder="Transit Duration or City"
                    className="w-full border rounded-md p-2"
                    required
                />
            )}

            {/* Comments */}
            <div className="relative w-full">
            <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows="1"
                placeholder="Additional Comments or Special Requests"
                className="w-full border-2 rounded-md p-2 border-amber-300"
            />
            </div>

            {/* reCAPTCHA */}
            {/*<div className="relative w-full">*/}
            {/*  <div*/}
            {/*      className="g-recaptcha"*/}
            {/*      data-sitekey="6LfWiFUrAAAAAKNKhYHVyBQkrE0f3bVXDpZbLk0w"*/}
            {/*      data-callback="handleRecaptcha"*/}
            {/*      ref={recaptchaRef}*/}
            {/*      style={{minHeight: '78px'}}*/}
            {/*  ></div>*/}
            {/*</div>*/}

            <div className="flex justify-center gap-4 mt-2 mb-4 flex-wrap">
              {[
                {label: "Pay with Card (Visa/Mastercard)", value: "MASTERCARD_CHECKOUT"},
                {label: "Pay Offline", value: "OFFLINE"},
              ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 text-m font-medium text-white">
                    <input
                        type="radio"
                        name="paymentMethod"
                        className="accent-[#0d0c3b]"
                        value={opt.value}
                        checked={paymentMethod === opt.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {opt.label}
                  </label>
              ))}
            </div>

            {/* Submit */}
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
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
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

window.handleRecaptcha = (token) => {
  document.dispatchEvent(new CustomEvent('recaptchaCallback', {detail: token}));
};

export default BookingForm;
