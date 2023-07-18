/* eslint-disable @typescript-eslint/no-unsafe-call */

import MultipleAnswerQuestionPagePlay from "@/components/MultipleAnswerQuestionPagePlay";
import SingleQuestionPagePlay from "@/components/SingleAnswerQuestionPagePlay";
import TextAnswerQuestionPagePlay from "@/components/TextAnswerQuestionPagePlay";
import { useAppSelector } from "@/store/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export default function PlayQuiz() {
  const { questions, currentQuestion } = useAppSelector(
    (state) => state.persist.quizPlay
  );
  const navigate = useNavigate();
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
  return (
    <main className="min-h-[50vh]">
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
    </main>
  );
}
