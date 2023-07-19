import { QuestionProgress } from "@/store/slices/quiz-play.slice";
import { AnswerInterface, QuestionSetInterface } from "./types";

type APIAnswer = {
  questions: Array<{
    question_text: string;
    user_answers: Array<{
      answer_text: string;
    }>;
  }>;
  points_earned: null | number;
  time_used: null | number;
};

type QuestionWithAnswersProgress = Array<QuestionProgress>;

// a singletone class to create answers for API payload
export class AnswerCreator {
  private static instance: AnswerCreator;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): AnswerCreator {
    if (!AnswerCreator.instance) {
      AnswerCreator.instance = new AnswerCreator();
    }
    return AnswerCreator.instance;
  }

  createPayload(
    questionset: QuestionSetInterface,
    questionProgress: QuestionWithAnswersProgress
  ): APIAnswer {
    const answer: APIAnswer =
      questionset.quiz_type === "PR"
        ? this.createPredictiveQuestions(questionProgress)
        : this.createFromNormalQuestions(questionProgress);
        console.log(answer);
        
    return answer;
  }
  private createFromNormalQuestions(
    questionProgress: QuestionWithAnswersProgress
  ): APIAnswer {
    const questions = questionProgress.map((progress) => {
      return AnswerCreator.extractQuestionAndAnswers(progress);
    }) as unknown as Pick<APIAnswer, "questions">;

    return {
      questions: questions.questions,
      points_earned: null,
      time_used: null,
    };
  }

  public static extractQuestionAndAnswers(payload: QuestionProgress) {
    const question_text = payload.question.question;
    const user_answers = payload.answer as AnswerInterface;
    return { question_text, user_answers: [{ answer_text: user_answers }] };
  }
  private createPredictiveQuestions(
    questionProgress: QuestionWithAnswersProgress
  ): APIAnswer {
    const questions = questionProgress.map((progress) => {
      return AnswerCreator.extractQuestionAndAnswers(progress);
    }) as unknown as Pick<APIAnswer, "questions">;

    return {
      questions: questions.questions,
      points_earned: null,
      time_used: null,
    };
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default AnswerCreator.getInstance();