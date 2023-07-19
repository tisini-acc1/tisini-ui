import { AnswerInterface } from "./types";
import { QuestionProgress } from "@/store/slices/quiz-play.slice";

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

// a Singleton class to create answers for API payload
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

  createPayload(questionProgress: QuestionWithAnswersProgress): APIAnswer {
    const answer: APIAnswer =
      this.createFromProgressQuestions(questionProgress);
    // console.log({ answer });

    return answer;
  }
  private createFromProgressQuestions(
    questionProgress: QuestionWithAnswersProgress
  ): APIAnswer {
    const questions = questionProgress.map((progress) => {
      return AnswerCreator.extractQuestionAndAnswers(progress);
    }) as unknown as Pick<APIAnswer, "questions">;
    const points_earned = questionProgress.reduce((acc, progress) => {
      if (progress.status === "answered") {
        return acc + progress.question.points
      }
      return acc;
    }, 0);
    const time_used = questionProgress.reduce((acc, progress) => {
      if (progress.status === "answered") {
        return acc + progress.question.duration!;
      }
      return acc;
    }, 0);

    // console.log({ questions });

    return {
      questions: questions as unknown as APIAnswer["questions"],
      points_earned: points_earned > 0 ? points_earned : 0,
      time_used: time_used > 0 ? time_used : 0,
    };
  }

  public static extractQuestionAndAnswers(payload: QuestionProgress) {
    const question_text = payload.question.question;
    const user_answers = payload.answer as AnswerInterface;

    let answers = [] as { answer_text: string }[];
    if (typeof user_answers === "string") {
      answers = [{ answer_text: user_answers }];
    } else if (Array.isArray(user_answers) && user_answers.length > 0) {
      answers = user_answers.map((answer: AnswerInterface) => ({
        answer_text: answer.answer,
      }));
    } else if (typeof user_answers === "object") {
      answers = [{ answer_text: user_answers.answer }];
    }
    return { question_text, user_answers: answers };
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default AnswerCreator.getInstance();
