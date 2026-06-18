import React from "react";
import Image from "next/image";

const TRAINER_FEATURES = [
  "BIOMETRIC PERFORMANCE TRACKING",
  "INDUSTRIAL STRENGTH PROGRAMMING",
  "NUTRITIONAL VELOCITY MANAGEMENT",
];

export default function EliteTrainers() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0d0d0d] border-t border-neutral-900/40 ">
      {/* Tactical Hazard Pattern background simulator */}
      <div 
        className="absolute inset-0 opacity-[0.02] -z-10 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #caf300 0px, #caf300 10px, transparent 10px, transparent 20px)`,
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Layout Container: Image Wrapper with strict relative boundaries */}
        <div className="w-full max-w-[480px] mx-auto lg:mx-0">
          <div className="relative bg-[#121212] p-2.5 border border-neutral-900/60 shadow-[0_0_30px_rgba(0,0,0,0.5)] group">
            
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLNxOT4M2W0ShHK4HGNN8wYlFLiLnJt3HcnQduSiL_9oA5MvDlrOihGDcfI3VarpgSmk0NG4XhFOM1vaOCmmYXvyifRZH2pLRf8ySBFMYbyMfReYqYH8NgZ6ZbA1rwMS58K2phA-hreH20VnxOfk6v59Gu-lDC4uh1y1Mw63AmG2X5TchLaS5OF6kxKSZxVpEwzrSe_5VqrPjq-2htUNgDTma2_IpMmy92teStMN0lz4wE0mB0ezeVWIpClQAdJUGkDoFkusrrt8w"
              alt="Elite Trainers collaboration in a high-tech gym environment"
              width={480}
              height={600}
              priority
              className="w-full aspect-[4/5] object-cover filter brightness-[0.65] contrast-[1.1]"
            />

            {/* Absolute Positioning Overlay - Safely nested inside the image frame container */}
            <div className="absolute bottom-4 -right-4 md:bottom-6 md:-right-30 w-[240px] md:w-64 p-5 bg-[#0e0e0e]/95 backdrop-blur-md border border-[#caf300]/40 shadow-[5px_5px_25px_rgba(0,0,0,0.8)] z-10">
              <p className="font-mono text-[10px] md:text-xs font-black tracking-[0.2em] text-[#caf300] uppercase italic">
                // SYSTEM OVERRIDE
              </p>
              <p className="text-neutral-300 font-sans text-xs md:text-[13px] font-medium leading-relaxed mt-2">
                Our trainers aren't coaches; they are structural engineers for your biology.
              </p>
            </div>

          </div>
        </div>

        {/* Right Layout Container: Telemetry & Typography Content */}
        <div className="lg:pl-6 text-left">
          <span className="block font-mono text-[11px] md:text-xs font-bold text-[#caf300] uppercase mb-4 tracking-[0.3em]">
            TRAIN WITH THE ELITE
          </span>
          
          <h2 className="font-sans text-2xl md:text-4xl lg:text-[42px] font-black uppercase italic mb-6 leading-tight tracking-tight text-white">
            PRECISION COACHING BY{" "}
            <span className="text-[#caf300] block sm:inline drop-shadow-[0_0_15px_rgba(202,243,0,0.1)]">
              INDUSTRY ARCHITECTS
            </span>
          </h2>
          
          <p className="text-neutral-400 font-sans text-sm md:text-base mb-8 leading-relaxed max-w-[560px]">
            Access the same methodology used by tactical units and professional
            competitors. Every program is built on verifiable biomechanical principles,
            ensuring you forge a body that is as resilient as it is powerful.
          </p>

          {/* Tactical Monospaced Bullet Matrix */}
          <ul className="space-y-3.5 mb-10 font-mono">
            {TRAINER_FEATURES.map((feature, index) => (
              <li key={index} className="flex items-center gap-3.5 group">
                <span className="w-1.5 h-1.5 bg-[#caf300] block shadow-[0_0_6px_#caf300] transition-transform duration-300 group-hover:scale-125" />
                <span className="text-xs md:text-[13px] font-bold tracking-widest text-neutral-200 transition-colors duration-200 group-hover:text-[#caf300]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Cyber Button Action */}
          <button className="bg-[#caf300] text-[#0d0d0d] px-10 py-4 font-mono text-xs md:text-sm font-black tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(202,243,0,0.25)] transition-all duration-300 active:scale-[0.97]">
            MEET THE SQUAD
          </button>
        </div>

      </div>
    </section>
  );
}