import React from "react";
import { FaWhatsapp } from "react-icons/fa";


const WhatsAppButton = () => {
  const phoneNumber = "+94776294923"; 
  const message = encodeURIComponent("Hello! I'm interested in your Services.");
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
    >
      <FaWhatsapp size={40} />
    </a>
  );
};

export default WhatsAppButton;
