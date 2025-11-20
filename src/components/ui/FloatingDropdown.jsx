"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FloatingDropdown({
  label,
  value,
  onChange,
  options = [],
  required = false,
  
}) {
  const [focused, setFocused] = useState(false);

  const labelFloating = focused || value;

  return (
    <div className="relative w-full">
      
      <div
        className={cn(
          "absolute inset-0 rounded-lg border transition-all duration-200 pointer-events-none text-xs",
          focused ? "border-[#957f7f] shadow-sm" : "border-gray-300"
        )}
      />

     
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={cn(
          "w-full bg-transparent px-4 py-3  pl-4 rounded-lg text-sm outline-none appearance-none cursor-pointer",
          
        )}
      >
        <option value="" disabled hidden>
          
        </option>
        {options.map((item, idx) => (
          <option key={idx} value={item} className="text-black">
            {item}
          </option>
        ))}
      </select>

 
      <label
        className={cn(
          "absolute bg-white px-1 left-3 transition-all duration-200 pointer-events-none",
          labelFloating
            ? "text-xs -top-2 text-black"
            : "top-1/2 -translate-y-1/2 text-gray-500 text-xs"
        )}
      >
        {label}
        {required && <span className="text-black">*</span>}
      </label>

     
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
        ▼
      </div>
    </div>
  );
}
