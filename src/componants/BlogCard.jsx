// src/components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg w-100 shadow-lg text-center items-center border border-gray-500 group">
      <Link to={blog.link}>
        <div className="overflow-hidden rounded mb-4 cursor-pointer">
          <img
            src={blog.image}
            alt="blog"
            className="w-full h-60 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
        <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
        <p className="text-sm text-gray-300 mt-2">{blog.description}</p>
        <button className="mt-4 cursor-pointer text-[#BE965B] font-semibold">Learn More →</button>
      </Link>
    </div>
  );
};

export default BlogCard;
