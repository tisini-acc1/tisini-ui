import shuffleItems from "@/lib/shuffle";
import {
  AnswerInterface,
  QuestionInterface,
  QuestionSetInterface,
  SelectableAnswerInterface,
} from "@/lib/types";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type QuestionProgress = 
  {
    question: QuestionInterface;
    answer: AnswerInterface | Array<AnswerInterface> | string | Array<string>;
    status: QuestionAnswerStatus;
  }

type QuestionAnswerStatus = "timedout" | "answered" | "skipped"; //as const;
export type PlayQuizState = {
  loading: boolean;
  error: string | null;
  questionSet: QuestionSetInterface | null;
  questions: Array<QuestionInterface>;
  currentQuestion:
    | (QuestionInterface & {
        isLastQuestion?: boolean;
      })
    | null;
  currentAnswers: Array<AnswerInterface>;
  allAnswered: boolean;
  progress: Array<QuestionProgress>;
  currentQuestionIndex: number;
  totalQuestions: number;
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
  allAnswered: false,
  totalQuestions: 0,
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
      const incomingQuestions = Array.isArray(action.payload.questions)
        ? shuffleItems(action.payload.questions).map((question, index) => ({
            ...question,
            isLastQuestion: index === action.payload.questions.length - 1,
          }))
        : [];
      state.questions = incomingQuestions;
      state.currentQuestion = incomingQuestions[0];
      state.currentQuestionIndex = 0;
      state.currentAnswers = state.currentQuestion.answers;
      state.totalQuestions = state.questions.length;
      state.progress = [];
      state.allAnswered = false;
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
      // check if index is not greater than questions length
      state.currentQuestion = {
        ...state.currentQuestion!,
        is_answered: true,
        selected_answer: action.payload.answer,
        duration: action.payload.duration,
      };
      // Update all questions
      state.questions = state.questions.map((question) =>
        question.uid === state.currentQuestion!.uid
          ? state.currentQuestion!
          : question
      );
      // check if question is already answered and question is in progress
      const currentProgress = state.progress;
      state.progress = [
        ...currentProgress,
        {
          question: state.currentQuestion,
          answer: action.payload.answer,
          status: action.payload.status,
        },
      ];

      // check if the last question is answered
      state.allAnswered = state.questions.reduce(
        (acc, curr) => acc && curr.is_answered!,
        true
      );
    },
    quizPlayNextQuestion: (state) => {
      state.currentQuestionIndex =
        state.currentQuestionIndex < state.questions.length - 1
          ? state.currentQuestionIndex + 1
          : state.currentQuestionIndex;
      state.currentQuestion = state.questions[state.currentQuestionIndex]!;
      state.currentAnswers = shuffleItems(state.currentQuestion.answers);
    },
    quizPlaySkipQuestion: (state) => {
      // check if question is already answered and question is in progress
      state.questions = state.questions.map((question) =>
        question.uid === state.currentQuestion!.uid
          ? {
              ...state.currentQuestion!,
              is_answered: true,
              selected_answer: "",
              duration: 0,
            }
          : question
      );

      // state.currentQuestionIndex =
      //   state.currentQuestionIndex < state.questions.length - 1
      //     ? state.currentQuestionIndex + 1
      //     : state.currentQuestionIndex;
      // state.currentQuestion = state.questions[state.currentQuestionIndex];
      // state.currentAnswers = shuffleItems(state.currentQuestion.answers);
      // state.allAnswered = state.questions.reduce(
      //   (acc, curr) => acc && curr.is_answered!,
      //   true
      // );
      state.currentQuestion = {
        ...state.currentQuestion!,
        is_answered: true,
        selected_answer: "",
        duration: 0,
      };
      state.progress = [
        ...state.progress,
        {
          question: state.currentQuestion,
          answer: "",
          status: "skipped",
        },
      ];
      // check if the last question is answered
      state.allAnswered = state.questions.reduce(
        (acc, curr) => acc && curr.is_answered!,
        true
      );
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
