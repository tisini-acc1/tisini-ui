import {
  AnswerInterface,
  QuestionInterface,
  QuestionSetInterface,
} from "@/lib/types";

import { createSlice } from "@reduxjs/toolkit";

type QuestionAnswerStatus = "timedout" | "answered" | "skipped"; //as const;
export type PlayQuizState = {
  loading: boolean;
  error: string | null;
  questionSet: QuestionSetInterface | null;
  questions: Array<string>;
  currentQuestion: string | null;
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
};

const quizPlaySlice = createSlice({
  name: "quiz-play",
  initialState,
  reducers: {},
});

export default quizPlaySlice.reducer;
