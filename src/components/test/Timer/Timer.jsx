"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tick, loadTimer } from "@/redux/examSlice";
import { Timer } from "lucide-react";

export default function TimerSet() {
  const dispatch = useDispatch();
  const timeLeft = useSelector((s) => s.exam.timeLeft);

 

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex justify-between items-center gap-2 mb-4 px-2">
      <p className=" text-[#1C3141] text-sm">Remaining Time:</p>
      <div className="flex items-center gap-2 bg-[#1C3141] text-white px-3 py-1 rounded-md">
        <Timer size={16} />
        <span className="text-sm">
          {" "}
          {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
}
