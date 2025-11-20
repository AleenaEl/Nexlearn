"use client";
import Image from "next/image";
import ComprehensionModal from "../ComprehensionModal/ComprehensionModal";
import { useState } from "react";
import { paragraphText } from "@/data/testData";

export default function QuestionBlock({
  questionNo = 1,
  total = 100,
  questionText,
  image,
  text,
  options = [],
  onSelect,
  selectedOption,
}) {
    const [openModal, setOpenModal] = useState(false);



  return (
    <div className=" mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md ">
    
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-[#0F6E8C] text-white px-4 py-2 rounded-md text-xs mb-4"
        >
          <Image src="/ArticleNyTimes.svg" width={16} height={16} alt="icon" />
          Read Comprehensive Paragraph{" "}
          <Image src="/Polygon.svg" width={6} height={6} alt="icon" />
        </button>
        <ComprehensionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          text={text}
        />

        <p className="font-medium text-[#1C3141] mb-3 text-sm">
          {questionNo}. {questionText}
        </p>

        {image && (
          <Image
            src={image}
            alt="Question Image"
            width={300}
            height={150}
            className="rounded-md border mb-4"
          />
        )}
      </div>

      <div className="space-y-4 mt-4 ">
        {options.map((opt, i) => {
          return (
            <label
              key={opt.id}
              className={`flex text-sm items-center justify-between border rounded-lg py-3 px-4 cursor-pointer bg-white hover:bg-gray-100 ${
                selectedOption === opt.id ? "border-[#1C3141]" : ""
              }`}
            >
              <span className="font-medium">
                {String.fromCharCode(65 + i)}. {opt.option}
              </span>

              <input
                type="radio"
                name={`question-${questionNo}`}
                checked={selectedOption === opt.id}
                onChange={() => onSelect(opt.id)}
                className="w-4 h-4"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
