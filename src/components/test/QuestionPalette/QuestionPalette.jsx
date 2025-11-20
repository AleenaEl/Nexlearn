"use client";

import { useDispatch, useSelector } from "react-redux";
import TimerSet from "../Timer/Timer";
import { goTo } from "@/redux/examSlice";



export default function QuestionPalette({ total }) {
    const dispatch = useDispatch();
    const { answers, review, visited, questions } = useSelector((s) => s.exam);


  return (
    <div className="w-full  ">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start lg:items-center">
        <h3 className=" text-[#1C3141] mb-3 text-sm ps-2 lg:ps-0">Question No. Sheet:</h3>
        <TimerSet />
      </div>

      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
        {questions.map((_, index) => {
          let colorClass = "bg-white";
          let content = index + 1; 

          const isAnswered = answers[index];
          const isReviewed = review[index];
          const isVisited = visited[index];

         
          if (isReviewed && isAnswered) {
            return (
              <button
                key={index}
                onClick={() => dispatch(goTo(index))}
                className="w-10 h-10 border rounded-md flex items-center justify-center text-black"
              >
                <div className="w-10 h-10 bg-[#800080] rounded flex justify-center items-center">
                  <div className="w-8 h-8 bg-[#4CAF50]  flex justify-center items-center">
                    {" "}
                    {content}
                  </div>
                </div>
              </button>
            );
          }

       
          if (isReviewed) {
            colorClass = "bg-[#800080] text-white";
          }

          
          else if (isAnswered) {
            colorClass = "bg-[#4CAF50] text-white";
          }

         
          else if (!isReviewed && !isAnswered && isVisited) {
            colorClass = "bg-[#EE3535] text-white";
          }

          return (
            <button
              key={index}
              className={`w-10 h-10 border text-black rounded-md flex items-center justify-center text-sm ${colorClass}`}
              onClick={() => dispatch(goTo(index))}
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className=" text-[10px] grid grid-cols-2 md:grid-cols-[auto_auto_auto_auto] items-center gap-y-2 md:gap-y-0 pb-5 lg:pb-0 ">
        <p className="flex items-center gap-2 ">
          <span className="w-4 h-4 bg-[#4CAF50] rounded"></span> Attended
        </p>
        <p className="flex items-center gap-2">
          <span className="w-4 h-4 bg-[#EE3535] rounded"></span> Not Attended
        </p>
        <p className="flex items-center gap-2">
          <span className="w-4 h-4 bg-[#800080] rounded"></span> Marked For
          Review
        </p>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#800080] rounded flex justify-center items-center">
            <div className="w-2.5 h-2.5 bg-[#4CAF50] "></div>
          </div>{" "}
          Answered and Marked For Review
        </div>
      </div>
    </div>
  );
}
