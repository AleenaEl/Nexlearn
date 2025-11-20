"use client";
import FloatingInput from "@/components/ui/floating-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PhoneField from "../ui/PhoneField";
import { verifyOtP } from "@/services/verifyServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function OtpForm({ mobile,onVerify }) {
  const [otp, setOtp] = useState("");
    const verifyMutation = useMutation({
      mutationFn: (formData) => verifyOtP(formData),
      onSuccess: (res) => {
        toast.success(res.message );
        if (res.success===true) {
          
          if (res.login === true) {
            
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
  
           
            onVerify("login");
          } else {
            //to AddDetails page
            onVerify("new-user");
          }
        } else if(res.success===false) {
          onVerify("resend-otp")
        }
      },
      onError: (err) => {
        const msg = err?.message ;
        toast.error(msg);
      },
    });
  const handleVerify = () => {
    if (!otp || otp.length < 4) return toast.error("Please enter a valid OTP");

    const formdata = new FormData();
    formdata.append("mobile", mobile); 
    formdata.append("otp", otp);

    verifyMutation.mutate(formdata);
  };

  return (
    <div className="max-w-sm h-full flex flex-col justify-between">
      <div className="flex flex-col gap-y-3 ">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-xl font-semibold">
            Enter the code we texted you
          </h2>
          <p className="text-xs text-[#1C3141]">
            We’ve sent an SMS to +91 1234 567891
          </p>
        </div>

        <PhoneField
          label="SMS Code"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <p className="text-xs text-gray-600">
          Your 6 digit code is on its way. This can sometimes take a few moments
          to arrive.
        </p>
        <p className="text-[#1C3141] text-xs underline font-medium">Resend code</p>
      </div>

      <Button
        className="w-full bg-[#0D1B2A] text-white rounded-lg py-3"
        onClick={handleVerify}
        disabled={verifyMutation.isPending}
      >
        {verifyMutation.isPending ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
}
