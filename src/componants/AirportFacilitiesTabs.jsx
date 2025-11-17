import React, { useEffect, useState } from "react";
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
import { useAirportTabs } from "../hooks/useAirportTabs";
import { useAirportFacilities } from "../hooks/useAirportFacilities";

const iconColor = "#BE965B";
const borderColor = "border-[#BE965B]";

const iconMap = {
  PlaneTakeoff,
  Briefcase,
  ShoppingBag,
  Hotel,
  HeartPulse,
  Car,
  Landmark,
  Utensils,
  Hospital,
  Banknote,
  Info, // fallback
};

function renderIcon(iconKey) {
  const IconComponent = iconMap[iconKey] || Info;
  return <IconComponent className="w-6 h-6" color={iconColor} />;
}

export default function AirportFacilitiesTabs() {
  const { airports, loading: loadingTabs, error: tabsError } = useAirportTabs();
  const [activeCode, setActiveCode] = useState(null);

  // When airports load, set first one as active by default
  useEffect(() => {
    if (!loadingTabs && airports.length > 0 && !activeCode) {
      setActiveCode(airports[0].code);
    }
  }, [loadingTabs, airports, activeCode]);

  const {
    airport,
    facilities,
    loading: loadingFacilities,
    error: facilitiesError,
  } = useAirportFacilities(activeCode, !!activeCode);

  return (
      <div className="max-w-6xl mx-auto p-4 bg-[#222]">
        <h1 className="text-3xl font-bold mb-8 text-[#BE965B]">
          Services at the Airport
        </h1>

        {/* Tabs loading / error / content */}
        {loadingTabs && (
            <div className="mb-6 text-gray-200 text-sm">
              Loading airports...
            </div>
        )}

        {tabsError && (
            <div className="mb-6 text-red-400 text-sm">
              Failed to load airports. Please try again later.
            </div>
        )}

        {!loadingTabs && !tabsError && airports.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6">
              {airports.map((airportItem) => (
                  <button
                      key={airportItem.code}
                      className={`px-6 py-2 rounded-md cursor-pointer font-semibold transition-colors ${
                          activeCode === airportItem.code
                              ? "bg-[#BE965B] text-white"
                              : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => setActiveCode(airportItem.code)}
                  >
                    {airportItem.name} ({airportItem.code})
                  </button>
              ))}
            </div>
        )}

        {/* Facilities loading / error / content */}
        <ScrollFadeIn>
          {activeCode && loadingFacilities && (
              <div className="text-gray-200 text-sm mb-4">
                Loading services for {activeCode}...
              </div>
          )}

          {activeCode && facilitiesError && (
              <div className="text-red-400 text-sm mb-4">
                Failed to load services for {activeCode}. Please try again later.
              </div>
          )}

          {!loadingFacilities &&
              !facilitiesError &&
              activeCode &&
              facilities.length === 0 && (
                  <div className="text-gray-300 text-sm">
                    No services found for this airport.
                  </div>
              )}

          {!loadingFacilities && !facilitiesError && facilities.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((facility) => (
                    <div
                        key={facility.id}
                        className={`bg-transparent shadow-md rounded-xl p-5 border ${borderColor} hover:shadow-lg hover:scale-105 transition-all`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {renderIcon(facility.iconKey)}
                        <h3 className="text-lg font-semibold text-[#BE965B]">
                          {facility.title}
                        </h3>
                      </div>
                      <p className="text-gray-100 text-sm text-justify">
                        {facility.content}
                      </p>
                    </div>
                ))}
              </div>
          )}
        </ScrollFadeIn>
      </div>
  );
}
