"use client";

import AddDetailsForm from "@/components/AddDetailsForm/AddDetailsForm";
import OtpForm from "@/components/OtpForm/OtpForm";
import PhoneNumberForm from "@/components/phoneNumberForm/phoneNumberForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Verify() {
    const router = useRouter();
  const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    
    const handleadddetails = () => {
        setStep(3)
    }
    const handleinst = () => {
        router.push("/exam/instructions")
    }
    const handlesetp1 = () => {
      setStep(1);
    };
  return (
    <div className="flex items-center justify-center h-screen bg-[url('/background-design.svg')] bg-cover px-2 md:px-0">
      <div className="absolute inset-0 bg-[#00000099] h-full"></div>

      <div className="flex z-10 flex-row bg-[linear-gradient(180deg,#1C3141_28.73%,#487EA7_233.43%)] rounded-xl shadow-xl overflow-hidden w-full max-w-2xl h-96 ">
        <div className="md:flex hidden  flex-col justify-between p-5 w-full text-white">
          <div className="flex  justify-center ">
            <Image src="/Logo.svg" width={160} height={80} alt="logo" />
          </div>

         
          <div className="flex justify-center ">
            <Image
              src="/login_image.svg"
              width={220}
              height={220}
              alt="illustration"
              
            />
          </div>
        </div>

        <div className=" bg-white rounded-md w-full m-2   p-5 h-auto flex items-center justify-center">
          <div className="w-full max-w-sm h-full">
            {step === 1 && (
              <PhoneNumberForm
                onNext={(phone) => {
                  setMobile(`+91${phone}`);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <OtpForm
                              mobile={mobile}
                              onVerify={()=> setStep(3)}
                // onVerify={(flow) => {
                //   if (flow === "login") handleinst();
                //   if (flow === "new-user") handleadddetails();
                //   if (flow === "resend-otp") handlesetp1();
                // }}
              />
            )}
            {step === 3 && <AddDetailsForm mobile={mobile} />}
          </div>
        </div>
      </div>
    </div>
  );
}
