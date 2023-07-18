/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import { useNavigate, useParams } from "react-router-dom";

import { QuestionSetInterface } from "@/lib/types";
import React from "react";
import moment from "moment";
import { privateAxios } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { initializeQuizPlay } from "@/store/slices/quiz-play.slice";

export default function QuizPrePlayPage() {
  const dispatch = useAppDispatch();
  const [quiz, setQuiz] = React.useState<QuestionSetInterface | null>(null);
  const { organizationId, questionSetId } = useParams<{
    organizationId: string;
    questionSetId: string;
  }>();
  const fetchQuestioSet = async () => {
    try {
      const response = await (
        await privateAxios.get(
          `/quiz/organizations/${organizationId}/questionsets/${questionSetId}/`
        )
      ).data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setQuiz(response);
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    Promise.allSettled([fetchQuestioSet()]).catch((error) =>
      console.log(error)
    );
  }, []);
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 min-h-[80vh] ">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">Quiz Pre-Play</h1>
        <div>
          <img
            className="w-full h-48 object-cover mt-2 border rounded my-2"
            src={quiz?.theme_image}
            alt=""
          />
        </div>
        <p className="text-sm text-gray-500">{quiz?.category_name}</p>
        <p className="text-sm text-gray-500">
          Amount paid {quiz?.amount_payable}
        </p>
        {quiz?.description ? (
          <p className="text-sm text-gray-500">{quiz?.description}</p>
        ) : (
          <></>
        )}
        <p className="text-sm text-gray-500">
          Type {quiz?.quiz_type === "NR" ? "Normal " : "Prediction"}
        </p>
        <p className="text-sm text-gray-500">
          Startime {moment(quiz?.start_datetime).format("LLL")}
        </p>
        <p className="text-sm text-gray-500">
          End time {moment(quiz?.end_datetime).format("LLL")}
        </p>
        <p className="text-sm text-gray-500"></p>
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded min-w-[10rem]"
            type="button"
            onClick={() => {
              dispatch(initializeQuizPlay(quiz!));
              navigate(
                `/organizations/questionsets/${organizationId}/${questionSetId}/play`,
                {
                  replace: true,
                  state: {
                    questionsetType: quiz?.quiz_type ?? "NR",
                    questionsetId: quiz?.uid ?? "",
                  },
                }
              );
            }}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
