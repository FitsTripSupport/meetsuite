import React, { useState, useRef, useEffect } from "react";
import ScrollFadeIn from "./ScrollFadeIn";

const faqs = [
  {
    question: "What is MeetSuite, and how does it work?",
    answer:
      "MeetSuite is our premium airport concierge service designed to offer seamless travel experiences. Whether arriving, departing, or transiting, our team assists you with everything from fast track immigration and baggage handling to lounge access and private transfers, making your journey smooth and stress-free.",
  },
  {
    question: "Who can use MeetSuite services?",
    answer:
      "MeetSuite is ideal for VIPs, business travellers, families, elderly passengers, celebrities, or anyone looking for extra comfort and support at the airport. We cater to both individuals and groups.",
  },
  {
    question: "What’s included in a typical MeetSuite package?",
    answer:
      "Our packages can include personalized meet and greet (based on availability), express immigration clearance, porter service, lounge access, buggy rides, and escort to/from aircraft or transport. Customizations are available to suit your needs.",
  },
  {
    question: "How early should I book the service?",
    answer:
      "We recommend booking at least 24 to 48 hours before your flight. However, we do our best to accommodate last-minute requests based on availability.",
  },
  {
    question: "At which airports is MeetSuite available?",
    answer:
      "MeetSuite is currently available at CMB - Colombo Bandaranaike International Airport in Sri Lanka and MLE - Velana International Airport. Contact us for availability at your travel destination.",
  },
];

function FAQItem({ faq, index, isOpen, toggle }) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <div
      className="border rounded-xl overflow-hidden shadow-sm transition-all duration-300"
    >
      <button
        onClick={() => toggle(index)}
        className="w-full text-left p-4 bg-black text-white font-medium text-lg flex justify-between items-center"
      >
        {faq.question}
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out bg-gray-100 px-4 text-gray-800"
      >
        <div className="py-2">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#BE965B]">
        FAQs
      </h2>
      <ScrollFadeIn>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              faq={faq}
              isOpen={openIndex === index}
              toggle={toggleFAQ}
            />
          ))}
        </div>
      </ScrollFadeIn>
    </section>
  );
}
