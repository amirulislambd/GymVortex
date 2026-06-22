
"use client";

import React from "react";
import { Modal, Button } from "@heroui/react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

export default function DynamicDeleteModal({ 
  isOpen, 
  onClose,       
  itemTitle,     
  isDeleting,   
  onConfirm      
}) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>

      <Modal.Backdrop className="backdrop-blur-md bg-black/85 fixed inset-0 w-screen h-screen z-[9999]" />
    
      <Modal.Container className="fixed inset-0 z-[10000] !bg-transparent w-full h-full pointer-events-none">
        <Modal.Dialog className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto border border-zinc-800 bg-[#0a0a0a] text-zinc-100 rounded-none max-w-md w-[92%] sm:w-full shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden m-0">
          
          {/* Absolute Close Trigger */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 cursor-pointer transition-colors z-10"
          >
            <FiX className="text-sm" />
          </button>
          
          {/* Modal Header */}
          <Modal.Header className="border-b border-zinc-900 font-mono text-xs tracking-widest uppercase flex gap-2 items-center text-red-500 p-5 bg-[#0d0d0d]">
            <FiAlertTriangle className="text-base" /> Dangerous Operation Protocol
          </Modal.Header>
          
          {/* Modal Body */}
          <Modal.Body className="py-6 px-5 font-sans text-xs sm:text-sm text-zinc-400 space-y-3 bg-[#0a0a0a]">
            <p className="tracking-wide">You are about to terminate the active protocol:</p>
            
            <div className="bg-[#121212] border border-zinc-900 p-4 font-mono text-zinc-200 text-xs rounded-none break-words tracking-wide">
              {itemTitle || "Selected Asset"}
            </div>
            
            <p className="text-[11px] text-red-500/80 italic leading-relaxed">
              * Warning: This action cannot be undone. All synchronized slot matrices and database records will be permanently cleared from the main framework.
            </p>
          </Modal.Body>
          
          {/* Modal Footer */}
          <Modal.Footer className="border-t border-zinc-900 p-4 bg-[#0d0d0d] flex justify-end gap-2 font-mono text-[9px] font-bold tracking-widest">
            <Button 
              radius="none"
              variant="bordered" 
              className="border-zinc-800 text-zinc-400 cursor-pointer hover:bg-zinc-900/60 h-9 px-4 uppercase" 
              onClick={onClose}
            >
              CANCEL
            </Button>
            
            <Button 
              radius="none"
              disabled={isDeleting}
              className="bg-red-600 text-white cursor-pointer hover:bg-red-700 font-bold h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onConfirm}
            >
              {isDeleting ? "TERMINATING..." : "TERMINATE PROTOCOL"}
            </Button>
          </Modal.Footer>
  
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}