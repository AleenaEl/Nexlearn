"use client";

import { instructions } from "@/data/testData";
import { startTimer } from "@/redux/examSlice";
import { fetchQuestionList } from "@/services/examServices";
import { useQuery } from "@tanstack/react-query";
import { CircleX, Loader2, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function InstructionsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: list,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["qnlist"],
    queryFn: fetchQuestionList,
  });
  const instructionsList = instructions;
    const handleStart = () => {
      const time = list.total_time;
      dispatch(startTimer(list.total_time * 60)); 
    //   dispatch(startTimer(1 * 60)); 
      toast.success("test begins!")
    router.push("/exam/test");
  };
  return (
    <div className=" flex flex-col justify-center items-center w-full ">
          <div className="flex flex-col items-center justify-start mt-4 gap-y-3 px-2 md:px-0 ">
              <header>
                  
        <h1 className="text-2xl font-semibold text-[#1C3141] ">
          Ancient Indian History MCQ
        </h1>
              </header>

        <div className="flex bg-[#1C3141] text-white rounded-lg px-5 md:px-10 py-5 space-x-5 md:space-x-10 shadow-lg">
          <div className="text-center md:w-40 pt-2 border-r-2 px-2 md:px-0 space-y-3  border-white flex flex-col justify-center items-center">
            <p className="text-sm md:text-base  ">Total MCQ’s:</p>
            {isLoading ? (
              <Loader2Icon className="w-7 h-7 animate-spin  text-white text-center" />
            ) : isError ? (
              <div className="flex flex-col items-center text-white">
                <CircleX className="w-5 h-5" />
                <span className="text-[10px] mt-1">Error</span>
              </div>
            ) : (
              <>
                <h2 className=" md:text-[2.25rem] font-normal ">
                  {list.questions_count}
                </h2>
              </>
            )}
          </div>

          <div className="text-center md:w-40 pt-2 border-r-2 px-2 md:px-0 space-y-3 border-white flex flex-col justify-center items-center">
            <p className="text-sm md:text-base ">Total marks:</p>
            {isLoading ? (
              <Loader2Icon className="w-7 h-7 animate-spin  text-white text-center" />
            ) : isError ? (
              <div className="flex flex-col items-center  text-white">
                <CircleX className="w-5 h-5" />
                <span className="text-[10px] mt-1">Error</span>
              </div>
            ) : (
              <>
                <h2 className="md:text-[2.25rem] font-normal ">
                  {list.total_marks}
                </h2>
              </>
            )}
          </div>

          <div className="text-center md:w-40 pt-2 space-y-3 px-2 md:px-0 flex flex-col justify-center items-center">
            <p className="text-sm md:text-base ">Total time:</p>
            {isLoading ? (
              <Loader2Icon className="w-7 h-7 animate-spin  text-white text-center" />
            ) : isError ? (
              <div className="flex flex-col items-center  text-white">
                <CircleX className="w-5 h-5" />
                <span className="text-[10px] mt-1">Error</span>
              </div>
            ) : (
              <>
                <h2 className="md:text-[2.25rem] font-normal ">
                  {String(list.total_time).padStart(2, "0")}:00
                </h2>
              </>
            )}
          </div>
        </div>

        <div className=" max-w-[40rem] text-[#5C5C5C] px-2 md:px-0">
          <h3 className="font-semibold mb-3">Instructions:</h3>

          <ol className="list-decimal pl-5 space-y-1 text-sm leading-relaxed">
            {instructionsList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>

        <button
          onClick={handleStart}
          className=" bg-[#1C3141] text-white py-3 w-1/2 mt-2 rounded-lg  hover:bg-[#0F1E2A] transition"
        >
          Start Test
        </button>
      </div>
    </div>
  );
}
