'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function Counter({ from, to, isFloat }) {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.2, ease: "easeOut" });
    const unsubscribe = count.on("change", (v) => {
      setDisplayValue(isFloat ? parseFloat(v.toFixed(1)) : Math.round(v));
    });
    return () => { controls.stop(); unsubscribe(); };
  }, [to]);

  return <motion.span>{displayValue}</motion.span>;
}

export default function MetricsGrid() {
  const metrics = [
    { title: "TOTAL STUDENTS ENROLLED", value: 42,  badge: "+12%" },
    { title: "TOTAL CLASSES CREATED",   value: 156, badge: "ACTIVE" },
    { title: "AVG. MEMBER RATING",      value: 4.9, badge: "ELITE", isFloat: true },
    { title: "TOTAL PRS TODAY",         value: 18,  badge: "HIGH" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {metrics.map((item, index) => (
        <div
          key={index}
          className="relative bg-[#171717]/90 p-5 border border-[#23261a] overflow-hidden group"
        >
          {/* hover glow border */}
          <div className="absolute inset-0 border border-[#caf300] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

          <p className="text-[10px] font-mono text-[#c5c9ac]/60 tracking-widest uppercase mb-2 relative z-10">
            {item.title}
          </p>

          <div className="flex items-end gap-2 relative z-10">
            <h3 className="text-4xl font-extrabold text-white leading-none tracking-tighter" style={{ fontFamily: "Archivo Narrow, sans-serif" }}>
              <Counter from={0} to={item.value} isFloat={item.isFloat} />
            </h3>
            <span className="text-[#caf300] text-[10px] font-bold font-mono uppercase tracking-wider mb-[2px]">
              {item.badge}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}