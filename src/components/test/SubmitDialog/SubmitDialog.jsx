"use client";
import { X } from "lucide-react";

export default function SubmitDialog({
  open,
  onClose,
  onConfirm,
  remainingTime,
  totalQuestions,
  answered,
  reviewed,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[350px] md:w-[360px] rounded-xl shadow-xl p-6">
     
        <div className="flex justify-between items-center pb-2 mb-4 border-b">
          <p className="text-sm ">Are you sure you want to submit the test?</p>
          <X className="cursor-pointer" onClick={onClose} size={16} />
        </div>

       
        <div className="space-y-6 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-[#1D3557] rounded-sm"></div>
              <span>Remaining Time:</span>
            </div>
            <b>{remainingTime}</b>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-[#FFC300] rounded-sm"></div>
              <span>Total Questions:</span>
            </div>
            <b>{totalQuestions}</b>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-[#4CAF50] rounded-sm"></div>
              <span>Questions Answered:</span>
            </div>
            <b>{answered.toString().padStart(3, "0")}</b>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-5 h-5 bg-[#800080] rounded-sm"></div>
              <span>Marked for review:</span>
            </div>
            <b>{reviewed.toString().padStart(3, "0")}</b>
          </div>
        </div>

        
        <button
          onClick={onConfirm}
          className="mt-6 w-full bg-[#1C3141] text-white py-2 rounded-md text-sm"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
