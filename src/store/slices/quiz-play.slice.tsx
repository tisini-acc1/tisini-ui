import shuffleItems from "@/lib/shuffle";
import {
  AnswerInterface,
  QuestionInterface,
  QuestionSetInterface,
  SelectableAnswerInterface,
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
    quizPlayAnswerQuestion: (
      state,
      action: PayloadAction<{
        answer: SelectableAnswerInterface;
        status: QuestionAnswerStatus;
        duration: number;
      }>
    ) => {
      // check if question is already answered and question is in progress
      state.progress.find(
        (item) => item.question.uid !== state.currentQuestion!.uid
      )
        ? state.progress
        : state.progress.push({
            question: state.currentQuestion!,
            answer: action.payload.answer,
            status: action.payload.status,
          });
      // check if index is not greater than questions length
      state.currentQuestion = {
        ...state.currentQuestion!,
        is_answered: true,
        selected_answer: action.payload.answer,
        duration: action.payload.duration,
      };
    },
    quizPlayNextQuestion: (state) => {
      state.currentQuestionIndex =
        state.currentQuestionIndex < state.questions.length - 1
          ? state.currentQuestionIndex + 1
          : state.currentQuestionIndex;
      state.currentQuestion = state.questions[state.currentQuestionIndex];
      state.currentAnswers = shuffleItems(state.currentQuestion.answers);
    },
    quizPlaySkipQuestion: (state) => {
      state.progress.push({
        question: state.currentQuestion!,
        answer: "",
        status: "skipped",
      });
      state.currentQuestionIndex =
        state.currentQuestionIndex < state.questions.length - 1
          ? state.currentQuestionIndex + 1
          : state.currentQuestionIndex;
      state.currentQuestion = state.questions[state.currentQuestionIndex];
      state.currentAnswers = shuffleItems(state.currentQuestion.answers);
    },
    quizPlayTimeoutQuestion: (state) => {
      state.progress.push({
        question: state.currentQuestion!,
        answer: "",
        status: "timedout",
      });
      state.currentQuestionIndex =
        state.currentQuestionIndex < state.questions.length - 1
          ? state.currentQuestionIndex + 1
          : state.currentQuestionIndex;
      state.currentQuestion = state.questions[state.currentQuestionIndex];
      state.currentAnswers = shuffleItems(state.currentQuestion.answers);
    },
  },
});

export const {
  initializeQuizPlay,
  quizPlayLoadStart,
  quizPlayTimeoutQuestion,
  quizPlayAnswerQuestion,
  quizPlayNextQuestion,
  quizPlaySkipQuestion,
} = quizPlaySlice.actions;

export default quizPlaySlice.reducer;
