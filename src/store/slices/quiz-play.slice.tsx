import shuffleItems from "@/lib/shuffle";
import {
  AnswerInterface,
  QuestionInterface,
  QuestionSetInterface,
} from "@/lib/types";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type QuestionAnswerStatus = "timedout" | "answered" | "skipped"; //as const;
export type PlayQuizState = {
  loading: boolean;
  error: string | null;
  questionSet: QuestionSetInterface | null;
  questions: Array<QuestionInterface>;
  currentQuestion: QuestionInterface | null;
  currentAnswers: Array<AnswerInterface>;
  progress: Array<{
    question: QuestionInterface;
    answer: AnswerInterface | Array<AnswerInterface> | string | Array<string>;
    status: QuestionAnswerStatus;
  }>;
  currentQuestionIndex: number;
};
const initialState: PlayQuizState = {
  loading: false,
  error: null,
  questionSet: null,
  questions: [],
  currentQuestion: null,
  progress: [],
  currentQuestionIndex: 0,
  currentAnswers: [],
};

const quizPlaySlice = createSlice({
  name: "quiz-play",
  initialState,
  reducers: {
    initializeQuizPlay: (
      state,
      action: PayloadAction<QuestionSetInterface>
    ) => {
      state.questionSet = action.payload;
      state.questions = shuffleItems(action.payload.questions);
      state.currentQuestion = state.questions[0];
      state.currentQuestionIndex = 0;
      state.currentAnswers = state.currentQuestion.answers;
    },
    quizPlayLoadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { initializeQuizPlay, quizPlayLoadStart } = quizPlaySlice.actions;

export default quizPlaySlice.reducer;
