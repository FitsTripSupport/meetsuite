// src/components/BlogPreview.jsx
import React from "react";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import ScrollFadeIn from "./ScrollFadeIn";

const BlogPreview = () => {
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
  ];

  return (
    <div id="blog" className="bg-black text-[#BE965B] py-20 items-center text-center">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold">Latest from Blog</h2>
      </div>
      <ScrollFadeIn>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {blogData.map((item, index) => (
          <BlogCard key={index} blog={item} />
        ))}
      </div>
      </ScrollFadeIn>
      <div className="py-10">
        <Link to="/blogpage">
        <button className="bg-[#BE965B] text-black border px-6 py-2 rounded-md font-semibold hover:bg-[#222222] hover:text-[#BE965B] hover:border transition duration-300">
  See More
</button>
</Link>
      </div>
    </div>
  );
};

export default BlogPreview;
 