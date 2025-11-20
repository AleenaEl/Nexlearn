"use client";
// import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function PhoneField({ label, value, onChange }) {
     const [focused, setFocused] = useState(false);
    
      const labelFloating = focused || value;
  return (
    <div className="relative w-full">
     
      <div
        className={cn(
          "absolute inset-0 rounded-lg border transition-all duration-200 pointer-events-none text-xs",
          focused ? "border-[#1976d2] shadow-sm" : "border-gray-300"
        )}
          />
       
      {/* <span className="text-[#1C3141] font-semibold text-base">+91</span> */}

      
      <input
        type="tel"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // placeholder="+91 1234 567891"
        className={cn(
          "w-full bg-transparent px-4 py-3 placeholder:text-sm  rounded-lg text-sm outline-none"
        )}
      />

      
      <label
        className={cn(
          "absolute bg-white px-1 left-3 transition-all duration-200",
          labelFloating
            ? "text-xs -top-2 text-[#1976d2]"
            : "top-1/2 -translate-y-1/2 text-gray-500 text-xs"
        )}
      >
        {label}
      </label>
    </div>
  );
}
