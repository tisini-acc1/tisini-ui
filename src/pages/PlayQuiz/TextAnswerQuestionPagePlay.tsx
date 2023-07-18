import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  quizPlayAnswerQuestion,
  quizPlayNextQuestion,
  quizPlaySkipQuestion,
} from "@/store/slices/quiz-play.slice";
import React from "react";

export default function TextAnswerQuestionPagePlay() {
  const [answer, setAnswer] = React.useState("");
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((state) => state.persist.quizPlay);
  return (
    <div className="font-pop">
      
      <h1 className="text-2xl font-bold">{currentQuestion?.question}</h1>
      <div className="mt-4">
        <h1 className="text-xl font-bold">Answer</h1>
        <input
          type="text"
          className="w-full border-2 border-gray-300 p-2 rounded-lg ring-0 focus:ring-0 focus:border-primary"
          value={answer}
          placeholder="Enter your answer here"
          onChange={(e) => setAnswer(e.target.value)}
          defaultValue={currentQuestion?.selected_answer as string}
        />
      </div>
      {/* add more actions of skip,continue and submit */}
      <div className="mt-4">
        <button
          className="border border-primary text-primary font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
          onClick={() => {
            dispatch(
              quizPlayAnswerQuestion({
                answer: answer,
                duration: 0,
                status: "answered",
              })
            );
          }}
        >
          Submit
        </button>

        <button
          className="bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
          onClick={() => {
            dispatch(quizPlaySkipQuestion());
          }}
        >
          Skip
        </button>

        <button
          className="bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-0 focus:ring-primary"
          onClick={() => {
            dispatch(quizPlayNextQuestion());
          }}
        >
          Continue
        </button>

        {currentQuestion?.is_answered ? (
          <div>
            <button className="bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-0 focus:ring-primary">
              Next
            </button>
          </div>
        ) : (
          <div>
            <button className="bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-0 focus:ring-primary">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
