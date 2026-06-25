"use client";

import React from "react";
import { Modal, Button } from "@heroui/react";
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

export default function DynamicDeleteModal({
  isOpen,
  onClose,
  itemTitle,
  isProcessing,
  type,
  onConfirm,
}) {
  if (!isOpen) return null;

  let theme = {
    headerColor: "text-red-500",
    headerBg: "bg-red-950/20",
    headerText: "Dangerous Operation Protocol",
    icon: <FiAlertTriangle className="text-base" />,
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
    confirmText: isProcessing ? "EXECUTING..." : "CONFIRM TERMINATION",
    subText:
      "* Warning: This action cannot be undone. Records will be altered permanently.",
  };

  if (type === "success" || type === "unblock") {
    theme = {
      headerColor: "text-lime-500",
      headerBg: "bg-lime-950/20",
      headerText: "Success Authorization Protocol",
      icon: <FiCheckCircle className="text-base" />,
      buttonClass: "bg-lime-600 hover:bg-lime-700 text-black font-extrabold",
      confirmText: isProcessing ? "INITIALIZING..." : "PROCEED OPERATION",
      subText:
        "* Notice: This action will restore standard operations and synchronize matrices.",
    };
  } else if (type === "admin" || type === "warning") {
    theme = {
      headerColor: "text-yellow-500",
      headerBg: "bg-yellow-950/20",
      headerText: "Security Elevation Protocol",
      icon: <FiInfo className="text-base" />,
      buttonClass:
        "bg-yellow-600 hover:bg-yellow-700 text-black font-extrabold",
      confirmText: isProcessing ? "ELEVATING..." : "GRANT ACCESS",
      subText:
        "* Warning: This will grant administrative privileges to the core framework.",
    };
  }

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

          {/* Dynamic Modal Header */}
          <Modal.Header
            className={`border-b border-zinc-900 font-mono text-xs tracking-widest uppercase flex gap-2 items-center p-5 ${theme.headerBg} ${theme.headerColor}`}
          >
            {theme.icon} {theme.headerText}
          </Modal.Header>

          {/* Modal Body */}
          <Modal.Body className="py-6 px-5 font-sans text-xs sm:text-sm text-zinc-400 space-y-3 bg-[#0a0a0a]">
            <p className="tracking-wide">
              You are about to execute the following matrix modification:
            </p>

            <div className="bg-[#121212] border border-zinc-900 p-4 font-mono text-zinc-200 text-xs rounded-none break-words tracking-wide">
              {itemTitle || "Selected Asset"}
            </div>

            {/* Dynamic Warning/Notice Subtext */}
            <p
              className={`text-[11px] italic leading-relaxed ${theme.headerColor}`}
            >
              {theme.subText}
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

            {/* Dynamic Action Button */}
            <Button
              radius="none"
              disabled={isProcessing}
              className={`cursor-pointer font-bold h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed ${theme.buttonClass}`}
              onClick={onConfirm}
            >
              {theme.confirmText}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}