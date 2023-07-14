import { QuestionSetInterface } from "@/lib/types";
import QuestionSetTimerCard from "./QuestionSetTimerCard";

type QuestionSetProps = {
  questionSets: Array<QuestionSetInterface>;
};
export default function OrganizationQuestionSets({ questionSets }: QuestionSetProps) {
  return (
    <div className="py-2">
      {questionSets?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {questionSets.map((questionSet) => (
            <div
              key={questionSet.uid}
              className="border cursor-pointer shadow-sm hover:shadow-md rounded overflow-hidden"
              onClick={() => console.log("clicked")}
            >
              <h1 className="text-xl font-bold p-2">{questionSet.category_name}</h1>
              {/* image */}
              <div className="h-60 w-full">
                <img
                  src={questionSet.theme_image}
                  alt={questionSet.category_name}
                  width={500}
                  height={500}
                  className="object-cover h-full w-full"
                />
              </div>
              {/* <div className="flex flex-row gap-2">
                <p className="text-sm">
                  {questionSet.questions.length} questions
                </p>
                <p className="text-sm">
                  {questionSet.questions.length} responses
                </p>
              </div> */}
                <QuestionSetTimerCard orgId="" qset={questionSet}  />
            </div>
          ))}
        </div>
      ) : (
        <p>No question sets found</p>
      )}
    </div>
  );
}
