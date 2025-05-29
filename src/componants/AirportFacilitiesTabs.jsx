import React, { useState } from "react";
import {
  PlaneTakeoff,
  Briefcase,
  ShoppingBag,
  Hotel,
  HeartPulse,
  Car,
  Landmark,
  Utensils,
  Info,
  Hospital,
  Banknote,
} from "lucide-react";
import ScrollFadeIn from "./ScrollFadeIn";

const iconColor = "#BE965B";
const borderColor = "border-[#BE965B]";

const cmbFacilities = [
  {
    title: "Terminals",
    icon: <PlaneTakeoff className="w-6 h-6" color={iconColor} />,
    content:
      "Terminal 1 (International - 12 gates), Terminal 2 (International- 8 gates), Terminal 3 (Domestic).",
  },
  {
    title: "Lounges",
    icon: <Briefcase className="w-6 h-6" color={iconColor} />,
    content:
      "Serendib Lounge (with spa), Palm Spirit Lounge, Araliya Lounge, Executive Lounge, Silk Route, Gold Route, Lotus Lounge.",
  },
  {
    title: "Shopping & Dining",
    icon: <ShoppingBag className="w-6 h-6" color={iconColor} />,
    content:
      "Duty-free shops (electronics, liquor, tea, etc.) and restaurants offering Sri Lankan & international cuisine.",
  },
  {
    title: "Transit Hotel",
    icon: <Hotel className="w-6 h-6" color={iconColor} />,
    content:
      "Serenediva Transit Hotel offers day rooms and rest without leaving the airport — ideal for layovers.",
  },
  {
    title: "Other Amenities",
    icon: <HeartPulse className="w-6 h-6" color={iconColor} />,
    content:
      "Banking, ATMs, medical center, childcare rooms, wheelchairs, lifts, accessible restrooms.",
  },
  {
    title: "Transportation",
    icon: <Car className="w-6 h-6" color={iconColor} />,
    content:
      "Taxis, Uber, PickMe, buses to Colombo. Colombo-Katunayake Expressway for fast city access.",
  },
];

const mleFacilities = [
  {
    title: "Terminals",
    icon: <Landmark className="w-6 h-6" color={iconColor} />,
    content:
      "International Terminal (global flights), Domestic Terminal (Maldives islands), Seaplane Terminal (resort transfers).",
  },
  {
    title: "Lounge",
    icon: <Briefcase className="w-6 h-6" color={iconColor} />,
    content:
      "Leeli Lounge offers snacks, drinks, and views for premium passengers or with day pass (if available).",
  },
  {
    title: "Shops & Restaurants",
    icon: <Utensils className="w-6 h-6" color={iconColor} />,
    content:
      "Duty-free shops with souvenirs & luxury goods. Restaurants serve various cuisines and snacks.",
  },
  {
    title: "Medical Services",
    icon: <Hospital className="w-6 h-6" color={iconColor} />,
    content:
      "On-site medical center & air ambulance service for island transfers.",
  },
  {
    title: "Banking & Info",
    icon: <Banknote className="w-6 h-6" color={iconColor} />,
    content:
      "ATMs, currency exchange, and information counters for guidance and support.",
  },
];

export default function AirportFacilitiesTabs() {
  const [activeTab, setActiveTab] = useState("CMB");

  const tabs = {
    CMB: cmbFacilities,
    MLE: mleFacilities,
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-[#222]">
       <h1 className="text-3xl  font-bold mb-8 text-[#BE965B]">Meetsuite Experience</h1>
      <div className="flex  gap-4 mb-6">
        <button
          className={`px-6 py-2 rounded-md cursor-pointer font-semibold ${
            activeTab === "CMB"
              ? "bg-[#BE965B] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("CMB")}
        >
          BANDARANAIKE INTERNATIONAL AIRPORT SRILANKA (CMB)
        </button>
        <button
          className={`px-6 py-2 rounded-md cursor-pointer font-semibold ${
            activeTab === "MLE"
              ? "bg-[#BE965B] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("MLE")}
        >
          VELANA INTERNATIONAL AIRPORT MALDIVES (MLE)
        </button>
      </div>

<ScrollFadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabs[activeTab].map((facility, index) => (
          <div
            key={index}
            className={`bg-transparent shadow-md rounded-xl p-5 border ${borderColor} hover:shadow-lg hover:scale-105 transition-all`}
          >
            <div className="flex items-center gap-3 mb-2">
              {facility.icon}
              <h3 className="text-lg font-semibold text-[#BE965B]">
                {facility.title}
              </h3>
            </div>
            <p className="text-gray-100 text-sm">{facility.content}</p>
          </div>
        ))}
      </div>
      </ScrollFadeIn>
    </div>
  );
}
