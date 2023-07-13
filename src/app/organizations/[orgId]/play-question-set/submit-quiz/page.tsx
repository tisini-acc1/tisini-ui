import React, { useState } from "react";

import Link from "next/link";

const submitTisiniQuiz = async (qsetId: string, payload: any, cb: any) => {};

const QuizSubmit = () => {
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitQuiz = () => {
    setIsLoading(true);
    submitTisiniQuiz(
      getScoreSummary.questionSetUid,
      {
        question_players: {
          points: getScoreSummary.score,
          timer: isNaN(getScoreSummary.avgDuration)
            ? 0
            : parseFloat(getScoreSummary.avgDuration.toFixed(2)),
        },
      },
      (data, err) => {
        if (err) {
          toast.error("Something went wrong submitting results", {
            position: "top-right",
          });
          setIsLoading(false);
        } else {
          setQuizSubmitted(true);
          getScoreSummary.resetState();
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader isLoading={isLoading} />
      {!quizSubmitted && (
        <div className="p-6 m-4 bg-white border text-center rounded shadow-lg max-w-2xl w-full">
          {/* Code inside first div when quizSubmitted is false */}
          <h2 className="text-2xl font-bold mb-2">Finish Quiz</h2>
          <div className="space-y-4">
            {/* Remaining JSX code... */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={submitQuiz}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {quizSubmitted && (
        <div>
          {/* Code inside second div when quizSubmitted is true */}
          <h1 className="text-2xl font-bold mb-2">Quiz submitted</h1>
          <p className="text-xl font-bold text-blue-500">
            Thank you for participating
          </p>
          <div className="flex items-center gap-4">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href={`/quizset-leaderboard/${getScoreSummary.questionSetUid}`}
            >
              Go to leaderboard
            </Link>
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href="/landing"
            >
              Go to home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSubmit;
