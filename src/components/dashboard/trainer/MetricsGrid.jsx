"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

function Counter({ from, to, isFloat }) {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.2, ease: "easeOut" });
    const unsubscribe = count.on("change", (v) => {
      setDisplayValue(isFloat ? parseFloat(v.toFixed(1)) : Math.round(v));
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [to]);

  return <motion.span>{displayValue}</motion.span>;
}

export default function MetricsGrid({ metrics }) {
  const {
    totalStudents = 0,
    totalClasses = 0,
    totalEnrolled = 0,
    bookingsTodayCount = 0,
  } = metrics || {};

  const formattedMetrics = [
    {
      title: "TOTAL STUDENTS ENROLLED",
      value: totalStudents,
      badge: "+LIVE",
    },
    {
      title: "TOTAL CLASSES CREATED",
      value: totalClasses,
      badge: "ACTIVE",
    },
    {
      title: "TOTAL ENROLLED",
      value: totalEnrolled,
      badge: "BOOKINGS",
    },
    {
      title: "BOOKINGS TODAY",
      value: bookingsTodayCount,
      badge: "TODAY",
    },
  ];

  return (
    /* মোবাইলের জন্য grid-cols-1 এবং বড় স্ক্রিনের জন্য md:grid-cols-4 করা হয়েছে */
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-[#121212] p-2 border border-neutral-800/20 rounded-md">
      {formattedMetrics.map((item, index) => (
        <div
          key={index}
          /* মোবাইলের জন্য p-5 এবং ল্যাপটপের জন্য md:p-6 করা হয়েছে যাতে স্পেসিং সুন্দর লাগে */
          className="relative p-5 md:p-6 bg-[#161616] min-h-[130px] md:min-h-[140px] flex flex-col justify-between group cursor-pointer transition-colors duration-300 border border-neutral-800/30 rounded-md hover:bg-[#1c1c1c]"
        >
          {/* হোভার বর্ডার অ্যানিমেশন (মোবাইল এবং পিসি দুইটার জন্যই রেসপনসিভ) */}
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[#caf300] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-out pointer-events-none rounded-l-md" />
          <div className="absolute inset-y-0 right-0 w-[3px] bg-[#caf300] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 ease-out pointer-events-none rounded-r-md" />
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#caf300] scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none rounded-b-md" />
          <div className="absolute top-0 inset-x-0 h-[2px] bg-[#caf300] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out pointer-events-none rounded-t-md" />

          <p className="text-[10px] font-mono text-[#8e8f85] font-semibold tracking-wider uppercase relative z-10 mb-4">
            {item.title}
          </p>

          <div className="flex items-baseline justify-between sm:justify-start gap-2 relative z-10 mt-auto">
            <h3
              /* মোবাইলে text-4xl এবং বড় স্ক্রিনে md:text-5xl করা হয়েছে যেন টেক্সট ওভারল্যাপ না করে */
              className="text-4xl md:text-5xl font-black text-white leading-none tracking-tight"
              style={{
                fontFamily: "'Archivo Narrow', 'Arial Black', sans-serif",
              }}
            >
              <Counter from={0} to={item.value} isFloat={item.isFloat} />
            </h3>
            <span className="text-[#caf300] text-[10px] font-black font-mono uppercase tracking-widest ml-auto sm:ml-0">
              {item.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
