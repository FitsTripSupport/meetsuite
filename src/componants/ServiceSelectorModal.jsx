import React from "react";
import cmbServices from "../../src/cmbServices.json";
import { FaCheckCircle } from "react-icons/fa";

const ServiceSelectorModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-green-200 bg-opacity-100 flex items-center justify-center">
      <div className="bg-green-300 max-w-6xl w-full rounded-xl p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-xl font-bold text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#000]">
          Select a Service
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cmbServices.map((service, index) => {
            console.log("Current Service:", service);
            const fullName = `${service.provider} - ${service.package}`;
            return (
              <div
                key={index}
                className="cursor-pointer bg-gradient-to-br from-[#FFD700] to-[#C9B037] rounded-xl shadow-lg p-5 hover:shadow-2xl transition"
                onClick={() => {
                  onSelect(fullName);
                  onClose();
                }}
              >
                <div className="mb-3">
                  <p className="text-sm text-white font-medium">{service.provider}</p>
                  <h3 className="text-lg font-semibold text-[#000]">{service.package}</h3>
                </div>
                {service.description && (
                  <p className="text-sm text-[#002366] mb-3">{service.description}</p>
                )}
                <ul className="space-y-1 text-sm text-[#002366] mb-3">
                  {service.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-white mt-1 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-right">
                  <p className="font-semibold text-[#000] text-sm mb-1">Price:</p>
                  <div className="font-bold text-[#000] text-base">
                    {service.price}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectorModal;