"use client";

import FloatingInput from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PhoneField from "../ui/PhoneField";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { sendOtP } from "@/services/verifyServices";


export default function PhoneNumberForm({ onNext }) {
  const [phone, setPhone] = useState("");

   const otpMutation = useMutation({
     mutationFn: (data) => sendOtP(data),
     onSuccess: (res) => {
       toast.success(res.message);
       onNext(phone); 
     },
     onError: (err) => {
       const msg = err?.message ;
       toast.error(msg);
     },
   });
   const handleSubmit = () => {
     if (!phone) return toast.error("Please enter a valid phone number");
     const Number = `+91${phone}`;
         const formdata = new FormData();
         formdata.append("mobile", Number);
     otpMutation.mutate(formdata);
   };
  return (
    <div className="max-w-sm flex flex-col justify-between   h-full">
      <div className="flex flex-col gap-y-3 ">
        <div className="flex flex-col gap-y-3 ">
          <h2 className="text-xl font-semibold">Enter your phone number</h2>
          <p className="text-xs text-[#1C3141]">
            We use your mobile number to identify your account
          </p>
        </div>

        <PhoneField
          label="Phone number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <p className="text-[10px] text-gray-500">
          By tapping Get started, you agree to the{" "}
          <span className="text-[#1C3141] cursor-pointer">
            Terms & Conditions
          </span>
        </p>
      </div>

      <Button
        className="w-full bg-[#0D1B2A] text-white rounded-lg "
        onClick={handleSubmit}
        disabled={otpMutation.isPending}
      >
        {otpMutation.isPending ? "Sending..." : "Get Started"}
      </Button>
    </div>
  );
}
