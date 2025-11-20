"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";


export default function ResultPage({}) {
    const router=useRouter()
    const result = useSelector((state) => state.examResult);
  

    const handledone = () => {
    router.push("/")
}
  return (
    <div className="  flex flex-col items-center ">
     
      <div className="bg-gradient-to-br from-[#006F8E] to-[#0a4151] text-white rounded-xl px-20 py-8 shadow-lg text-center mt-4">
        <p className="text-lg">Marks Obtained:</p>
        <h1 className="text-5xl font-semibold mt-2">
          {result.score} / {result.total}
        </h1>
      </div>

    
      <div className="mt-10 space-y-6">
 
        <div className="flex items-center gap-4 text-[#1C3141]">
          <span className="w-7 h-7 bg-[#DDA428] rounded flex items-center justify-center text-white text-xs">
            <Image src="/Vector (1).svg" width={12} height={12} alt="icon" />
          </span>
          <p className="text-sm w-48">Total Questions:</p>
          <p className="font-semibold">{result.total}</p>
        </div>

        <div className="flex items-center gap-4 text-[#1C3141]">
          <span className="w-7 h-7 bg-[#4CAF50] rounded flex items-center justify-center text-white text-xs">
            <Image src="/Subtract (1).svg" width={12} height={12} alt="icon" />
          </span>
          <p className="text-sm w-48">Correct Answers:</p>
          <p className="font-semibold">{result.correct}</p>
        </div>

      
        <div className="flex items-center gap-4 text-[#1C3141]">
          <span className="w-7 h-7 bg-[#EE3535] rounded flex items-center justify-center text-white text-xs">
            <Image src="/Subtract.svg" width={12} height={12} alt="icon" />
          </span>
          <p className="text-sm w-48">Incorrect Answers:</p>
          <p className="font-semibold">{result.wrong}</p>
        </div>

        
        <div className="flex items-center gap-4 text-[#1C3141]">
          <span className="w-7 h-7 bg-[#5C5C5C] rounded flex items-center justify-center text-white text-xs">
            <Image src="/Vector.svg" width={12} height={12} alt="icon" />
          </span>
          <p className="text-sm w-48">Not Attended Questions:</p>
          <p className="font-semibold">{result.notAttended}</p>
        </div>
      </div>

      {/* DONE BUTTON */}
      <button
        onClick={handledone}
        className="mt-10 bg-[#1C3141] text-white w-[20%] py-3 rounded-lg hover:bg-[#14232f] transition"
      >
        Done
      </button>
    </div>
  );
}
