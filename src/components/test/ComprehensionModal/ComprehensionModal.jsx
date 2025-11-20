"use client";

export default function ComprehensionModal({ open, onClose, text }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl max-w-xl mx-5 md:mx-0  xl:max-w-6xl w-full max-h-[80%] overflow-y-auto">
       
        <div className="flex justify-between items-center  py-4 border-b  mx-5">
          <h2 className="text-sm">Comprehensive Paragraph</h2>
        </div>

        <div className="p-5 text-sm leading-relaxed text-[#1C3141] space-y-4 w-full ">
          {!text ? <p>No comprehension found</p> : <>{text}</>}
        </div>

    
        <div className="flex justify-end px-5 py-3 ">
          <button
            onClick={onClose}
            className="bg-[#1C3141] text-white w-1/4 py-2 rounded-md text-sm"
          >
            Minimize
          </button>
        </div>
      </div>
    </div>
  );
}
