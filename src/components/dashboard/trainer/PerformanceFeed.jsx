import { Button } from '@heroui/react';
import React from 'react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import { IoAnalyticsOutline } from 'react-icons/io5';


export default function PerformanceFeed() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold flex items-center gap-2 text-gym-text">
          <IoAnalyticsOutline className="text-gym-lime" />
          Athlete Performance Feed
        </h4>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gym-surface-high text-[10px] font-bold uppercase tracking-widest border border-gym-border text-gym-text">Filter: All</span>
          <span className="px-3 py-1 bg-gym-surface-high text-[10px] font-bold uppercase tracking-widest border border-gym-border text-gym-text">Sort: Latest</span>
        </div>
      </div>

      {/* Card 1: Marcus Thorne */}
      <div className="bg-gym-surface/70 backdrop-blur-md p-4 rounded-sm border border-gym-border hover:border-gym-lime/40 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gym-surface-high flex-shrink-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4RtX3Qdgsh6FduwyNliuQb9UMiJWMuUbUkpfu_e3ip-cCicAMNafCIHii4fgk9X95JD2hcH9N-nPd5qnaEvetF_8JGLJIoFk-vWuLajX7fv_FTyaSODidk0_M260Mg91Cin8yHqFxmfo2KdfiBxjD9P6VpWOet4mamNTshzVrvaCICyAllLYkM8uBS80rRbQeYi3ev5SDyMlxwNsKM1clzMGM1ZEHp8Atc6AEmk500p7f27eS0dwIcQcawxVb-iTZfq14OM3yI-M" alt="Marcus" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-bold text-gym-text">Marcus Thorne <span className="text-xs text-gym-muted opacity-60 ml-2 font-mono">8 minutes ago</span></h5>
              <span className="px-2 py-0.5 bg-gym-lime text-gym-dark-lime text-[10px] font-black uppercase">Personal Record</span>
            </div>
            <p className="text-gym-muted text-sm mt-1">Crushed <span className="text-gym-lime font-bold">Deadlift: 485lbs x 3</span> during 'Power Surge' program.</p>
            
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="bg-gym-bg p-2 border-l border-gym-border">
                <p className="text-[9px] uppercase text-gym-muted">Intensity</p>
                <p className="font-mono text-xs font-bold text-gym-text">9.5/10 RPE</p>
              </div>
              <div className="bg-gym-bg p-2 border-l border-gym-border">
                <p className="text-[9px] uppercase text-gym-muted">Volume</p>
                <p className="font-mono text-xs font-bold text-gym-text">14,200 lbs</p>
              </div>
              <div className="bg-gym-bg p-2 border-l border-gym-border">
                <p className="text-[9px] uppercase text-gym-muted">Rest Time</p>
                <p className="font-mono text-xs font-bold text-gym-text">180s Avg</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-gym-muted">
            <button className="p-1 hover:text-gym-lime"><FiThumbsUp size={16} /></button>
            <button className="p-1 hover:text-gym-lime"><FiMessageSquare size={16} /></button>
          </div>
        </div>
      </div>

      {/* Card 2: Sarah Jenkins */}
      <div className="bg-gym-surface/70 backdrop-blur-md p-4 rounded-sm border border-gym-border hover:border-gym-lime/40 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gym-surface-high flex-shrink-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCenlFQayr-o523-DbgEiUL8ANUZ119z5xWCpPj_3nccLnXD8XA6q0r3hG8pdrIsZHslOZ6HLZat7r3OcseYCVxdcO6OOccE7nd8HepkgMFd1xscQ59UBmcLu0QX1GCHbra186eMwzVTA8Xg2izHHFWuD-nCWUoTLqQ9cmYagIVDOOLQ3Mk1ArWRqmgkqU29SG-f8UmKhwnTfch5VhqhX5IJh2C9Larb3k6LH4v8Rk8aPmoSWtyDGO_-RVWLc_7lYGLM6Jxt9NKFfw" alt="Sarah" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-bold text-gym-text">Sarah Jenkins <span className="text-xs text-gym-muted opacity-60 ml-2 font-mono">24 minutes ago</span></h5>
              <span className="px-2 py-0.5 bg-white text-black text-[10px] font-black uppercase">Completed</span>
            </div>
            <p className="text-gym-muted text-sm mt-1">Finished <span className="text-white font-bold">Engine Builder Level 2</span>. Time: 18:42 (-12s split).</p>
            {/* Hazard Stripe Progress Bar */}
            <div className="w-full h-2 bg-gym-bg mt-4 relative overflow-hidden rounded-full">
              <div className="h-full bg-gym-lime w-[85%]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #caf300, #caf300 10px, #171e00 10px, #171e00 20px)' }}></div>
            </div>
            <p className="text-[9px] uppercase text-gym-muted mt-1 text-right font-mono">Program Progress: 85%</p>
          </div>
          <div className="flex flex-col gap-2 text-gym-muted">
            <button className="p-1 hover:text-gym-lime"><FiThumbsUp size={16} /></button>
            <button className="p-1 hover:text-gym-lime"><FiMessageSquare size={16} /></button>
          </div>
        </div>
      </div>

      {/* Card 3: Elena Rodriguez */}
      <div className="bg-gym-surface/70 backdrop-blur-md p-4 rounded-sm border border-gym-border hover:border-gym-lime/40 transition-all duration-200 opacity-80">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gym-surface-high flex-shrink-0">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcy32vTMlhNHql2AhQJga42oqRtTpCn5uh0qGS-GEBkcf1xZx_H8tqJ5QRdw8KUVoeggK79GZ9EVyPIXBwwCeXSDi7uk_p4xofn2ZS026ftsxNYJe0feU9JJ9IUMXIxN9z48nhk_w4bbgPYNvLHsVESLKaHnlQoULjvhw6IWTuR_VfUSozZi0HutFTEC5ZXbw316cKqQGCaSUERWc3WCJvenS0U7e39tXH-fItt8gDvSVXt8HTPHnixdqoZnZxoaX8WE6bONXSA3U" alt="Elena" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-bold text-gym-text">Elena Rodriguez <span className="text-xs text-gym-muted opacity-60 ml-2 font-mono">1 hour ago</span></h5>
              <span className="px-2 py-0.5 border border-gym-border text-gym-muted text-[10px] font-black uppercase">Schedule Update</span>
            </div>
            <p className="text-gym-muted text-sm mt-1">Requested reschedule for Tuesday PT Session. Reason: Work Overtime.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="sm" radius="none" className="bg-gym-lime text-gym-dark-lime text-[10px] font-bold uppercase h-7">Approve</Button>
            <Button size="sm" radius="none" className="bg-gym-surface-high text-white text-[10px] font-bold uppercase h-7">Deny</Button>
          </div>
        </div>
      </div>
    </div>
  );
}