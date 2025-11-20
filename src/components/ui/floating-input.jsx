"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FloatingInput({
  label,
  value,
  onChange,
  type,
  icon,
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

      
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full bg-transparent px-4 py-3 placeholder:text-sm  rounded-lg text-sm outline-none",
          icon ? "pl-10" : "pl-4"
        )}
      />

      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
          {icon}
        </div>
      )}

     
      <label
        className={cn(
          "absolute bg-white px-1 left-3 transition-all duration-200",
          labelFloating
            ? "text-xs -top-2 text-black"
            : "top-1/2 -translate-y-1/2 text-gray-500 text-xs"
        )}
      >
        {label}
        {required && <span className="text-black">*</span>}
      </label>
    </div>
  );
}
