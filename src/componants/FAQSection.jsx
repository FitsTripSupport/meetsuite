import React from "react";
import { useState } from "react";
import ScrollFadeIn from "./ScrollFadeIn";

const faqs = [
  {
    question: "What are FTS MeetSuite Services at the Airport?",
    answer:
      "FTS MeetSuite services aim to make getting through the airport smooth and easy for travelers. These services often cover things like personal greetings, help with luggage, quicker security lines, access to lounges, and other similar perks. Whether you're flying solo, with company, or need extra help, these services can take a load off and make your trip better.",
  },
  {
    question: "How do I book Airport Assistance services with FTS MeetSuite?",
    answer:
      "You can reserve our services on our website at https://www.meetsuite.io, where we have lots of options like meet and greet, speedy security, luggage help, and lounge entry. You can also contact our customer service team for personalized assistance in choosing the right services for your needs.",
  },
  {
    question:
      "What is FTS MeetSuite Fast Track Airport Assistance by https://www.meetsuite.io?",
    answer:
      "If you're looking to zip through the airport without the usual wait, FTS Meet And Greet in Sri Lanka, offered by https://www.meetsuite.io, could be just what you need. It lets you skip those never-ending security lines and breeze through the airport. This service is perfect if you're pressed for time or just want to dodge the stress of long waits. With Fast Track, a personal agent helps you through security and immigration, making the whole process a lot smoother.",
  },
  {
    question: "What is Meet and Greet Service at the Airport?",
    answer:
      "FTS Meet and Greet Airport Assistance, available at https://www.meetsuite.io, offers a personal touch to your airport experience. A representative will meet you upon arrival and help with everything from luggage to navigating immigration and customs. This service is all about making your journey as easy and comfy as possible. Whether you're arriving, departing, or catching a connecting flight, Meet and Greet ensures a smooth ride.",
  },
  {
    question: "How do I get special assistance at the Airport?",
    answer:
      "Planning to use special assistance at the airport? Make sure to give your airline or travel agent a heads-up at least 48 hours before you fly. This helps them get everything in place for your needs, like wheelchairs, specific meals, or medical help. You can also book these services directly through https://www.meetsuite.io. Our agents are professionals at giving personalized support throughout your trip. We're ready to help with mobility, vision, hearing, or any other challenges, and we also offer support for families with little ones or older travelers.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#BE965B]">FAQs</h2>
      <ScrollFadeIn>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden shadow-sm transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-black text-white font-medium text-lg flex justify-between items-center"
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="bg-gray-100 px-4 pb-4 pt-2 text-gray-800">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      </ScrollFadeIn>
    </section>
  );
}
