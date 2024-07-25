/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { QuestionSetInterface } from "@/lib/types";
import React from "react";
import { initializeQuizPlay } from "@/store/slices/quiz-play.slice";
import moment from "moment";
import { privateAxios } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { LucidePlay } from "lucide-react";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function QuizPrePlayPage() {
  const dispatch = useAppDispatch();
  const [quiz, setQuiz] = React.useState<QuestionSetInterface | null>(null);
  const { organizationId, questionSetId } = useParams<{
    organizationId: string;
    questionSetId: string;
  }>();
  let location = useLocation();

  const url = location.pathname.startsWith("/tanobora") ? "tanobora" : "quiz";

  const title = location.pathname.startsWith("/tanobora")
    ? "Tano Bora"
    : "Quiz";

  const fetchQuestioSet = async () => {
    try {
      const response = await (
        await privateAxios.get(
          `/${url}/organizations/${organizationId}/questionsets/${questionSetId}/`
        )
      ).data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setQuiz(response);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    Promise.allSettled([fetchQuestioSet()]).catch((error) =>
      console.log(error)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  const spanHeaderStyle =
    "text-xl block uppercase underline text-primary font-semibold";

  return (
    <MaxWidthWrapper className="max-w-7xl mx-auto p-4 md:p-6 min-h-[80vh] ">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">
          {`${title} Pre-Play`}
        </h1>
        <div>
          <img
            className="w-full h-80 object-cover mt-2 border rounded my-2"
            src={quiz?.theme_image}
            alt=""
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="text-sm text-gray-500 border p-2">
            <span className={spanHeaderStyle}>Sponsored by:</span>
            <strong className="text-lg">{quiz?.description}</strong>
            {/* <p>{quiz?.description}</p> */}
          </div>
          <div className="text-sm text-gray-500 border p-2">
            <span className={spanHeaderStyle}>Category name</span>
            <strong className="text-lg">{quiz?.category_name}</strong>
          </div>
          <div className="text-sm text-gray-500 border p-2">
            <span className={spanHeaderStyle}> Amount paid</span>
            <strong className="text-lg">{quiz?.amount_payable}</strong>
          </div>
          {quiz?.prize_won && (
            <div className="text-sm text-gray-500 border p-2">
              <span className={spanHeaderStyle}> Amount won</span>
              <strong className="text-lg">{quiz?.prize_won}</strong>
            </div>
          )}

          <div className="text-xl text-gray-500 border p-2">
            <span className={spanHeaderStyle}> Type</span>{" "}
            {quiz?.quiz_type === "NR" ? "Normal " : "Prediction"}
          </div>
          <div className="text-xl text-gray-500 border p-2">
            Startime {moment(quiz?.start_datetime).format("LLL")}
          </div>
          <div className="text-xl text-gray-500 border p-2">
            End time {moment(quiz?.end_datetime).format("LLL")}
          </div>
          {/* <p className="text-2xl text-gray-500"></p> */}
          {/* <div></div> */}
          <div className="w-full sm:col-span-2 ">
            <button
              className="bg-primary hover:bg-blue-500 text-white px-4  rounded min-w-[10rem] w-full text-xl sm:text-2xl py-2 flex items-center justify-center gap-2 flex-row transition-all duration-300 ease-in-out"
              type="button"
              onClick={() => {
                if (quiz) {
                  dispatch(
                    initializeQuizPlay({
                      org: organizationId!,
                      questionSet: { ...quiz! },
                    })
                  );
                  navigate(
                    `/${url}/questionsets/${organizationId}/${questionSetId}/play`,
                    {
                      replace: true,
                      state: {
                        questionsetType: quiz?.quiz_type ?? "NR",
                        questionsetId: quiz?.uid ?? "",
                      },
                    }
                  );
                } else {
                  alert('Something went wrong!')
                }
              }}
            >
              <LucidePlay size={36} /> Play
            </button>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
