import { QuestionSetInterface } from "@/lib/types";
import React from "react";
import { privateAxios } from "@/lib/api";
import { useParams } from "react-router-dom";

export default function QuizPrePlayPage() {
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
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    Promise.allSettled([fetchQuestioSet()]).catch((error) =>
      console.log(error)
    );
  }, []);

  return <div>QuizPrePlay</div>;
}
