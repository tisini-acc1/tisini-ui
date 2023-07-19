/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import Confetti from "react-confetti";
import MultipleAnswerQuestionPagePlay from "@/pages/PlayQuiz/MultipleAnswerQuestionPagePlay";
import React from "react";
import SingleQuestionPagePlay from "@/pages/PlayQuiz/SingleAnswerQuestionPagePlay";
import TextAnswerQuestionPagePlay from "@/pages/PlayQuiz/TextAnswerQuestionPagePlay";
import answerCreator from "@/lib/answer-creator";
import { privateAxios } from "@/lib/api";
import { useAppSelector } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function PlayQuiz() {
  const { questions, currentQuestion, allAnswered, progress, questionSet } =
    useAppSelector((state) => state.persist.quizPlay);
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = React.useState<boolean>(true);
  React.useEffect(() => {
    // check there are questions if not navigate to organizations
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    questions.length === 0 && navigate("/organizations");
  }, [questions, navigate]);
  const questionType = React.useMemo(() => {
    if (questions.length > 0) {
      return currentQuestion?.quiz_type;
    }
    return "";
  }, [questions, currentQuestion]);
  // Create a function that will check if all questions are answered and show coffeti once all questions are answered then timout after 2seconds
  React.useEffect(() => {
    if (allAnswered) {
      setTimeout(() => {
        setIsExploding(true);
      }, 100);
    }
  }, [allAnswered]);

  // turn off coffeti when all questions are answered
  React.useEffect(() => {
    if (allAnswered) {
      setTimeout(() => {
        setIsExploding(false);
      }, 10000);
    }
  }, [allAnswered]);
  const submitResults = async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    try {
      const payload = answerCreator.createPayload(progress);
      const response = await privateAxios.post(
        `/quiz/quiz_leaderboard/${questionSet?.uid}/leaderboard/`,
        payload
      );
      console.log({ response });
    } catch (error: any) {
      console.log({ error });
    }
  };
  return (
    <main className="min-h-[50vh]">
      {!allAnswered ? (
        <div className="max-w-7xl mx-auto p-4 w-full">
          {questionType === "multiple" ? (
            <MultipleAnswerQuestionPagePlay />
          ) : questionType === "single" ? (
            <SingleQuestionPagePlay />
          ) : questionType === "text" ? (
            <TextAnswerQuestionPagePlay />
          ) : (
            <div>Unknown</div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto text-center p-4">
          {isExploding && (
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          )}
          {/* <h1 className="text-2xl">All done</h1>
          <p>
            You have answered all the questions. You can now view your results
            and see how you did.
          </p> */}
          {questionType === "multiple" ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">All done</h1>
              <p>
                You have answered all the questions. You can now view your
                results and see how you did.
              </p>
              <div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={async () => submitResults()}
                >
                  Submit results
                </button>
              </div>
              {/* Red note  */}
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
                <strong className="font-bold">Note: </strong>
                <span className="block sm:inline">
                  You can only submit your results once. Once you have submitted
                  your results you cannot change them. Results will be available
                  to view once the games have ended.
                </span>
              </div>
              <code>
                {JSON.stringify(answerCreator.createPayload(progress), null, 2)}
              </code>
            </div>
          ) : questionType === "single" ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">All done single</h1>
              <p>
                You have answered all the questions. You can now view your
                results and see how you did.
              </p>
              <div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                  onClick={async () => {
                    await submitResults();
                    // navigate("/results");
                  }}
                >
                  Submit results
                </button>
              </div>
              {/* Red note  */}
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
                <strong className="font-bold">Note: </strong>
                <span className="block sm:inline">
                  You can only submit your results once. Once you have submitted
                  your results you cannot change them. Results will be available
                  to view once the games have ended.
                </span>
              </div>
              <code>
                {JSON.stringify(answerCreator.createPayload(progress), null, 2)}
              </code>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl">All done</h1>
              <p>
                You have answered all the questions. You can now view your
                results and see how you did.
              </p>
              <div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
                  onClick={async () => {
                    await submitResults();
                    // navigate("/results");
                  }}
                >
                  Submit results
                </button>
              </div>
              {/* Red note  */}
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
                <strong className="font-bold">Note: </strong>
                <span className="block sm:inline">
                  You can only submit your results once. Once you have submitted
                  your results you cannot change them. Results will be available
                  to view once the games have ended.
                </span>
              </div>
              <code>
                {JSON.stringify(answerCreator.createPayload(progress), null, 2)}
              </code>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
