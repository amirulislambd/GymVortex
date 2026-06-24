"use client";
import React from "react";
// lucide-react বাদ দিয়ে react-icons/fa ব্যবহার করা হয়েছে
import { FaBookOpen, FaHeart, FaShieldAlt } from "react-icons/fa";

export default function UserStatsCards({ stats }) {
  const {
    totalBooked = 0,
    totalFavorites = 0,
    role = "user"
  } = stats || {};

  const cardData = [
    {
      title: "TOTAL BOOKED CLASSES",
      value: totalBooked,
      badge: "ENROLLED",
      icon: <FaBookOpen className="w-5 h-5 text-[#caf300]" />,
    },
    {
      title: "TOTAL FAVORITES",
      value: totalFavorites,
      badge: "SAVED",
      icon: <FaHeart className="w-5 h-5 text-red-500" />,
    },
    {
      title: "ACCOUNT ROLE",
      value: role.toUpperCase(),
      badge: "VERIFIED",
      icon: <FaShieldAlt className="w-5 h-5 text-blue-400" />,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121212] p-2 border border-neutral-800/20 rounded-md mb-6">
      {cardData.map((item, index) => (
        <div
          key={index}
          className="relative p-5 bg-[#161616] min-h-[120px] flex flex-col justify-between group cursor-pointer transition-colors duration-300 border border-neutral-800/30 rounded-md hover:bg-[#1c1c1c]"
        >
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[#caf300] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out pointer-events-none rounded-l-md" />
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#caf300] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none rounded-b-md" />

          <div className="flex justify-between items-start relative z-10">
            <p className="text-[10px] font-mono text-[#8e8f85] font-semibold tracking-wider uppercase">
              {item.title}
            </p>
            {item.icon}
          </div>

          <div className="flex items-baseline justify-between gap-2 relative z-10 mt-auto">
            <h3 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tight font-mono">
              {item.value}
            </h3>
            <span className="text-[#caf300] text-[10px] font-black font-mono uppercase tracking-widest">
              {item.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}