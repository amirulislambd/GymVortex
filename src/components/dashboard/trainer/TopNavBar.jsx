import React from 'react';
import { Button, Input, Avatar } from '@nextui-org/react';
import { FiSearch } from 'react-icons/fi';

export default function TopNavBar() {
  return (
    <header className="flex justify-between items-center px-6 h-16 w-full bg-[#131313] border-b border-[#23261a] sticky top-0 z-40">
      
      {/* বাম দিকের লোগো এবং সার্চ বার */}
      <div className="flex items-center gap-6">
        {/* GYMVORTEX ব্র্যান্ড নাম */}
        <h2 className="text-xl font-extrabold tracking-tighter text-[#caf300] uppercase font-sans">
          GYMVORTEX
        </h2>
        
        {/* সার্চ ইনপুট ফিল্ড */}
        <div className="relative w-64">
          <Input
            placeholder="Search athletes, logs, ses"
            radius="none"
            size="sm"
            startContent={<FiSearch className="text-[#c5c9ac]/40 text-sm flex-shrink-0" />}
            classNames={{
              input: [
                "bg-transparent",
                "text-xs",
                "font-mono",
                "text-[#e5e2e1]",
                "placeholder:text-[#c5c9ac]/30",
              ],
              inputWrapper: [
                "bg-[#201f1f]",
                "h-8",
                "px-3",
                "border-none",
                "data-[hover=true]:bg-[#2a2a2a]",
                "group-data-[focus=true]:bg-[#2a2a2a]",
              ],
            }}
          />
        </div>
      </div>

      {/* ডান দিকের বোতাম এবং ট্রেইনার প্রোফাইল */}
      <div className="flex items-center gap-4">
        {/* Create Workout বাটন */}
        <Button 
          radius="none" 
          size="sm"
          className="bg-[#caf300] text-[#171e00] font-mono text-xs font-bold uppercase tracking-tight px-5 h-8 hover:brightness-110 min-w-max transition-all"
        >
          Create Workout
        </Button>

        {/* মাঝখানের চিকন ডিভাইডার লাইন */}
        <div className="h-8 w-[1px] bg-[#23261a] mx-2" />

        {/* প্রোফাইল সেকশন (Alex Rivera) */}
        <div className="flex items-center gap-3">
          {/* নাম, ইমেইল এবং ট্রেইনার ট্যাগ */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-sm text-white tracking-wide">
                Alex Rivera
              </span>
              {/* ট্রেইনার পিল ব্যাজ */}
              <span className="px-2 py-0.5 bg-[#caf300] text-[#171e00] text-[9px] font-extrabold uppercase rounded-full font-sans tracking-wide">
                TRAINER
              </span>
            </div>
            {/* ইমেইল এড্রেস */}
            <p className="text-[10px] font-mono text-[#c5c9ac]/50 mt-0.5">
              a.rivera@gymvortex.com
            </p>
          </div>

          {/* ট্রেইনার প্রোফাইল ইমেজ (বক্স বর্ডার সহ) */}
          <div className="w-10 h-10 border border-[#23261a] p-[1px] bg-[#171717] overflow-hidden rounded-none">
            <img 
              className="w-full h-full object-cover grayscale-[20%]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiqy1CV1c8CIi0q71yXXtMEtpDMiA6Yxwc4BDMREiUKy7OZl1eT030NbqF2qLn68QV24MYaTXqIY2rSDsb8ONbedDn4vBzKyYD-ko2PUZFZDmA6tXFjdwtnrQrEWYegP6FBqh10Y1w2e08W88EKJnixLVbTVrus-xb6u1hmELsrVMGBzJSSXj5MWDBH_6tv3Q9FpT3PfOsne_opfjZVeoeNha8BQIgyHeODXt8pSE99AELp5WXFwdO6RkJ25E6ogwtzJsLsSL2FH0" 
              alt="Alex Rivera Profile"
            />
          </div>
        </div>

      </div>
    </header>
  );
}