import { Button } from '@heroui/react';
import React from 'react';
import { FiCloudLightning, FiMessageSquare } from 'react-icons/fi';

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Session Schedule */}
      <div className="bg-gym-surface/70 backdrop-blur-md rounded-sm border border-gym-border overflow-hidden">
        <div className="p-4 border-b border-gym-border flex justify-between items-center">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gym-text">Session Schedule</h4>
          <span className="font-mono text-xs text-gym-lime">OCT 24</span>
        </div>
        <div className="p-4 space-y-3">
          {/* Slot 1 */}
          <div className="flex items-start gap-3 p-3 bg-gym-bg border-l-4 border-transparent hover:border-gym-lime transition-all">
            <div className="text-center w-12 border-r border-gym-border pr-3">
              <p className="text-[10px] uppercase text-gym-muted font-mono">08:00</p>
              <p className="font-bold text-lg text-gym-text">AM</p>
            </div>
            <div>
              <p className="font-bold text-sm text-gym-text">Group: Iron Core</p>
              <p className="text-xs text-gym-muted">12 Athletes Signed Up</p>
            </div>
          </div>
          {/* Slot 2 (Active/Highlighted) */}
          <div className="flex items-start gap-3 p-3 bg-gym-surface-high border-l-4 border-gym-lime">
            <div className="text-center w-12 border-r border-gym-border pr-3">
              <p className="text-[10px] uppercase text-gym-muted font-mono">10:30</p>
              <p className="font-bold text-lg text-gym-text">AM</p>
            </div>
            <div>
              <p className="font-bold text-sm text-gym-text">PT: David Chen</p>
              <p className="text-xs text-gym-muted">Hypertrophy Block A</p>
            </div>
          </div>
          {/* Slot 3 */}
          <div className="flex items-start gap-3 p-3 bg-gym-bg border-l-4 border-transparent hover:border-gym-lime transition-all opacity-60">
            <div className="text-center w-12 border-r border-gym-border pr-3">
              <p className="text-[10px] uppercase text-gym-muted font-mono">01:00</p>
              <p className="font-bold text-lg text-gym-text">PM</p>
            </div>
            <div>
              <p className="font-bold text-sm text-gym-text">PT: Sarah Jenkins</p>
              <p className="text-xs text-gym-muted">Conditioning / Engine</p>
            </div>
          </div>
        </div>
        <Button fullWidth radius="none" className="bg-gym-surface-high text-[10px] font-bold text-gym-muted uppercase hover:text-white h-10">
          View Full Calendar
        </Button>
      </div>

      {/* Coach's Forum */}
      <div className="bg-gym-surface/70 backdrop-blur-md rounded-sm border border-gym-border p-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gym-text mb-4 pb-2 border-b border-gym-border">
          Coach's Forum
        </h4>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gym-surface-high flex items-center justify-center border border-gym-lime text-gym-lime">
              <FiMessageSquare size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-gym-text">New: Program Discussion</p>
              <p className="text-[10px] text-gym-muted font-mono">Winter Bulking '24 adjustments...</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gym-surface-high flex items-center justify-center border border-white text-white">
              <FiCloudLightning size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-gym-text">Equipment Maintenance</p>
              <p className="text-[10px] text-gym-muted font-mono">Squat Rack 4 cable tension issue.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}