"use client";
import QuestionBlock from "@/components/test/QuestionBlock/QuestionBlock";
import QuestionPalette from "@/components/test/QuestionPalette/QuestionPalette";
import SubmitDialog from "@/components/test/SubmitDialog/SubmitDialog";
import { mockQuestions } from "@/data/questions";
import { setExamResult } from "@/redux/examResultSlice";
import {
    loadTimer,
  markForReview,
  nextQuestion,
  prevQuestion,
  selectAnswer,
  setQuestions,
  tick,
} from "@/redux/examSlice";
import { fetchQuestionList, submitexam } from "@/services/examServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function TestPage() {
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
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
  const submitMutation = useMutation({
    mutationFn: (fd) => submitexam(fd),
    onSuccess: (res) => {
      dispatch(
        setExamResult({
          score: res.score,
          correct: res.correct,
          wrong: res.wrong,
          notAttended: res.not_attended,
          total: questions.length,
          details: res.details,
        })
      );

      router.push("/exam/result");
    },
  });
  useEffect(() => {
    if (list?.questions) {
      dispatch(setQuestions(list.questions));
    }
  }, [list]);
    
    useEffect(() => {
      dispatch(loadTimer());
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(tick());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

  const { questions, currentIndex, answers, review, timeLeft } = useSelector(
    (s) => s.exam
  );

  const handleconfirm = () => {
    const answerArray = questions.map((q, index) => ({
      question_id: q.question_id,
      selected_option_id: answers[index] || null,
    }));

    const fd = new FormData();
    fd.append("answers", JSON.stringify(answerArray));

    submitMutation.mutate(fd);
    toast.success("test successfully submitted");
    // router.push("/exam/result");
  };
  useEffect(() => {
    if (timeLeft === 0) {
      setShowSubmitDialog(false);
      handleconfirm();
    }
  }, [timeLeft]);
  
  if (isLoading || !questions || questions.length === 0) {
    return <div className="p-10">Loading question...</div>;
  }
  const currentQ = questions[currentIndex];

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  //  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col w-full xl:flex-row  gap-x-3 h-full">
      <div className="p-6 overflow-y-auto w-full xl:w-[65%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg  text-[#1C3141]">
            Ancient Indian History MCQ
          </h2>

          <div className="border px-4 py-1 rounded-md bg-white text-black  text-sm">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
        <QuestionBlock
          questionNo={currentIndex + 1}
          questionText={currentQ.question}
          image={currentQ.image}
          options={currentQ.options}
          text={currentQ.comprehension}
          selectedOption={answers[currentIndex]}
          onSelect={(value) =>
            dispatch(selectAnswer({ index: currentIndex, answer: value }))
          }
        />
        <div className="flex gap-2 md:gap-4 text-xs">
          <button
            className="flex-1 bg-[#800080] text-white py-2 rounded-md px-2 md:px-0"
            onClick={() => dispatch(markForReview())}
          >
            Mark For Review
          </button>

          <button
            className="flex-1 bg-[#CECECE] py-2 rounded-md"
            onClick={() => dispatch(prevQuestion())}
          >
            Previous
          </button>

          <button
            className="flex-1 bg-[#1C3141] text-white py-2 rounded-md"
            onClick={() =>
              currentIndex === questions.length - 1
                ? setShowSubmitDialog(true)
                : dispatch(nextQuestion())
            }
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending
              ? "Submitting..."
              : currentIndex === questions.length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>

      <div className="mt-4 border-l px-4 overflow-y-auto xl:overflow-y-hidden w-full xl:w-[35%]  ">
        <QuestionPalette total={questions.length} />
      </div>
      <SubmitDialog
        open={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
        onConfirm={handleconfirm}
        remainingTime={`${minutes}:${seconds}`}
        totalQuestions={questions.length}
        answered={Object.keys(answers).length}
        reviewed={Object.keys(review).length}
      />
    </div>
  );
}
