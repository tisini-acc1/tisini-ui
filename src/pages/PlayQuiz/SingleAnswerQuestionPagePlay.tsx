/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import {
  quizPlayAnswerQuestion,
  quizPlayNextQuestion,
  quizPlaySkipQuestion,
} from "@/store/slices/quiz-play.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import React from "react";

type SingleQuestionPagePlayProps = {
  timeLeft: number;
  clearTimer: () => void;
  timeUsed: number;
};

export default function SingleQuestionPagePlay({
  timeLeft,
  clearTimer,
  timeUsed,
}: SingleQuestionPagePlayProps) {
  const { currentAnswers, currentQuestion,currentQuestionIndex,totalQuestions } = useAppSelector(
    (state) => state.persist.quizPlay
  );
  const dispatch = useAppDispatch();
  const [answer, setAnswer] = React.useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAnswer(value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearTimer();
    dispatch(
      quizPlayAnswerQuestion({
        answer: selectedAnswer!,
        duration: timeUsed,
        status: "answered",
      })
    );
  };
  const selectedAnswer = React.useMemo(() => {
    return currentAnswers.find((ans) => ans.uid === answer);
  }, [answer, currentAnswers]);
  return (
    <form onSubmit={handleSubmit}>
      {!currentQuestion?.is_answered && (
        <div className="flex flex-row items-center gap-2 p-2">
          <div className="flex flex-row items-center gap-2">
            <div className="text-2xl font-bold">{timeLeft}</div>
            <div className="text-2xl font-bold">seconds left</div>
          </div>
        </div>
      )}
      {/* <h1>Multiple Answer Question Page</h1> */}
      <h2>Question <span className="p-2">
        {currentQuestionIndex+1}/{totalQuestions}
        </span>: {currentQuestion!.question}</h2>
      {currentQuestion?.is_answered ? (
        <div className="py-2 flex flex-col gap-2">
          <div>
            <div className="underline">Selected answers</div>
          </div>
          <div
            className={`${
              currentQuestion.selected_answer &&
              currentQuestion.selected_answer.is_answer
                ? "bg-green-600 text-light"
                : "bg-red-600 text-white"
            } px-2 border rounded-md w-fit`}
          >
            {typeof currentQuestion.selected_answer === "object" &&
            Object.hasOwnProperty.call(
              currentQuestion.selected_answer,
              "answer"
            )
              ? String(currentQuestion.selected_answer.answer!)
              : ""}
          </div>
        </div>
      ) : (
        <div className="p-2">
          {currentQuestion!.answers.map((answer) => (
            <div
              key={answer.uid}
              className="flex flex-row items-center gap-2 p-2"
            >
              <input
                type="radio"
                name={currentQuestion!.uid}
                value={answer.uid}
                id={answer.answer}
                onChange={handleInputChange}
              />
              <label htmlFor={currentQuestion!.uid}>{answer.answer}</label>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 p-2">
        {!currentQuestion?.is_answered && (
          <button
            type="submit"
            className="bg-primary text-white rounded-md px-4 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentQuestion?.is_answered}
          >
            Submit
          </button>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-primary text-white rounded-md px-4 text-center"
            onClick={() => dispatch(quizPlayNextQuestion())}
          >
            Next
          </button>
          {!currentQuestion?.is_answered && (
            <button
              type="button"
              className="bg-primary text-white rounded-md px-4 text-center"
              onClick={() => {
                clearTimer();
                dispatch(quizPlaySkipQuestion({ duration: timeUsed }));
              }}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
