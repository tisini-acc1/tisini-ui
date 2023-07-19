/* eslint-disable @typescript-eslint/no-unsafe-call */

import answerCreator from "@/lib/answer-creator";
import MultipleAnswerQuestionPagePlay from "@/pages/PlayQuiz/MultipleAnswerQuestionPagePlay";
import SingleQuestionPagePlay from "@/pages/PlayQuiz/SingleAnswerQuestionPagePlay";
import TextAnswerQuestionPagePlay from "@/pages/PlayQuiz/TextAnswerQuestionPagePlay";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import Confetti from "react-confetti";
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
  const handleServerSubmit = () => {};
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
            "Multiple"
          ) : questionType === "single" ? (
            "Single"
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
                  onClick={() => navigate("/results")}
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
                {JSON.stringify(
                  answerCreator.createPayload(questionSet!, progress),
                  null,
                  2
                )}
              </code>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
