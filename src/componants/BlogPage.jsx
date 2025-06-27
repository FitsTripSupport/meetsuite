// src/pages/BlogPage.jsx
import React, { useEffect } from "react";
import BlogCard from "./BlogCard";
import { div } from "framer-motion/client";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollFadeIn from "./ScrollFadeIn";

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogData = [
    {
      title: "Find or list tools that",
      description: "We've helped thousands of teams document their internal knowledge, collaborate, and reduce onboarding time by 40%.",
      image: "/assets/airport.jpg",
       link: "/blogpage/blog1",
    },
    {
      title: "Find or list tools that",
      description: "Simple and elegant documentation platform for remote teams. Increase collaboration and productivity.",
      image: "/assets/airport.jpg",
      link: "/blogpage/blog1",
    },
    {
      title: "Find or list tools that",
      description: "Organize all your knowledge in one place, making it easy to onboard new team members.",
      image: "/assets/airport.jpg",
      link: "/blogpage/blog1",
    },
    {
      title: "Find or list tools that",
      description: "Make internal documentation seamless and engaging. Help your team work better, together.",
      image: "/assets/airport.jpg",
      link: "/blogpage/blog1",
    },
    {
      title: "Find or list tools that",
      description: "Speed up onboarding with structured, easy-to-follow guides and collaborative editing tools.",
      image: "/assets/airport.jpg",
      link: "/blogpage/blog1",
    },
    {
      title: "Find or list tools that",
      description: "Save time by turning recurring questions into rich, searchable documentation.",
      image: "/assets/airport.jpg",
      link: "/blogpage/blog1",
      
    }
  ];

  return (
    <div>
      <Navbar/>
      <div className="text-center text-white pt-50 h-100 bg-[#222222] justify-center">
        <h1 className="text-3xl md:text-6xl font-bold">Insight and Updates</h1>
        <p className="mt-4 text-md md:text-xl">
          Find or list tools that will designers build on. Simply simplify with
          our comprehensive and carefully vetted library from the start.
        </p>
      </div>
    <div className="bg-black text-white  py-20"> 
      <ScrollFadeIn>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">All Articles</h1>
        <p className="mt-4 text-sm">
           Find or list tools that will designers build to. Simply simplify with our comprehensive and carefully vetted library from the start.
        </p>
      </div>
       
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {blogData.map((item, index) => (
          <BlogCard key={index} blog={item} />
        ))}
      </div>
      </ScrollFadeIn>
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPage;
