import {
  AnswerInterface,
  OrganizationInterface,
  QuestionInterface,
  QuestionSetInterface,
  QuizStoreInterface,
} from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import shuffleItems from "@/lib/shuffle";
import { stateKeys } from "@/lib/constants";

const initialState: QuizStoreInterface = localStorage.getItem(
  stateKeys["tisini-app-quizState"]
)
  ? JSON.parse(localStorage.getItem(stateKeys["tisini-app-quizState"])!)
  : {
      currentQuestionPlayer: null,
      counter: 0,
      currentOrganization: null,
      currentQuestion: null,
      currentQuestionSet: null,
      organizations: [],
      isPlaying: false,
      questions: [],
      timer: 0,
      currentQuestionIndex: 0,
      scoreSummary: null,
      currentAnswers: [],
      questionPlayers: [],
    };

const quizStoreSlice = createSlice({
  name: "quizStore",
  initialState,
  reducers: {
    syncState: (state) => {
      return localStorage.setItem(
        stateKeys["tisini-app-quizState"],
        JSON.stringify(state)
      );
    },

    updateCounter: (state, action: PayloadAction<number>) => {
      // make counter run and update the counter until it reaches the quizCounterLength
      // run for seconds based on the quizCounterLength then stop
      if (state.counter < action.payload) {
        state.counter++;
        //   setTimeout(updateCounter, 1000);
      } else {
        state.counter = 0;
      }
    },

    setCurrentQuerySet(state, action: PayloadAction<QuestionSetInterface>) {
      // load single question set from the current organization
      state.currentQuestionSet = action.payload;
      // this.loadQuestions(qset.questions);
      // state.setCurreQuestionIndex(0);
      state.currentQuestion = state.questions[state.currentQuestionIndex];
      state.scoreSummary = null;
      //   Set answers
      localStorage.setItem(
        stateKeys["tisini-app-quizState"],
        JSON.stringify(state)
      );
      // fetch organizations from the server
      // set the organizations
    },

    loadOrganizations(state, action: PayloadAction<OrganizationInterface[]>) {
      state.organizations = action.payload;
      // fetch organizations from the server
      // set the organizations
    },
    loadQuestions(state, action: PayloadAction<QuestionInterface[]>) {
      state.questions = shuffleItems(action.payload);
      state.currentQuestion = state.questions[state.currentQuestionIndex];
    },
    setCurrentOrganization(
      state,
      action: PayloadAction<OrganizationInterface | null>
    ) {
      // load organization from the organizations
      state.currentOrganization = action.payload;
    },
    moveTonextQuestion(state, action: PayloadAction<QuestionInterface | null>) {
      state.currentQuestionIndex++;
      state.currentQuestion = state.questions[state.currentQuestionIndex];
      state.currentAnswers = shuffleItems(state.currentQuestion?.answers ?? []);
      // move to the next question
    },

    setCurreQuestionIndex(state, action: PayloadAction<number>) {
      // set the current question index
      state.currentQuestionIndex = action.payload;
      state.currentQuestion =
        action.payload < state.questions.length
          ? state.questions[action.payload]
          : null;
      state.currentAnswers = shuffleItems(state.currentQuestion?.answers ?? []);
    },
    answerQuestion(
      state,
      action: PayloadAction<{ answer: AnswerInterface; seconds: number }>
    ) {
      // answer the question
      state.currentQuestion!.selected_answer = action.payload.answer;
      state.currentQuestion!.is_answered = true;
      state.currentQuestion!.duration = action.payload.seconds;
      state.questions = state.questions.map((q) => {
        if (q.uid === state.currentQuestion!.uid) {
          q.selected_answer = action.payload.answer;
          q.is_answered = true;
        }
        return q;
      });
      // set the current question answer
    },
    syncCurrentQuestionDuration(state, action: PayloadAction<number>) {
      // sync the current question duration
      state.currentQuestion!.duration = action.payload;
      state.questions = state.questions.map((q) => {
        if (q.uid === state.currentQuestion!.uid) {
          q.duration = action.payload;
        }
        return q;
      });
      // if (state.currentQuestion?.timer) {
      //   state.currentQuestion!.timer = seconds;
      // }
      localStorage.setItem(
        stateKeys["tisini-app-quizState"],
        JSON.stringify(state)
      );
    },
    finishQuiz: (state) => {
      // console.log("finish quiz");

      // finish the quiz
      const points = state.questions.reduce((acc, q) => {
        if (q.is_answered && q.selected_answer?.is_answer) {
          acc += q.points;
        }
        return acc;
      }, 0);
      // console.log("points", points);

      const totalDuration = state.questions.reduce((acc, q) => {
        acc += q.duration!;
        return acc;
      }, 0);
      // console.log("totalDuration", totalDuration);
      const avgDuration = totalDuration / state.questions.length;
      console.log("avg duration", avgDuration);

      const correctAnswers = state.questions.reduce((acc, q) => {
        if (q.selected_answer?.is_correct) {
          acc += 1;
        }
        return acc;
      }, 0);
      // console.log("correctAnswers", correctAnswers);

      state.scoreSummary = {
        organizationUid: state.currentOrganization!.uid,
        questionSetUid: state.currentQuestionSet!.uid,
        score: points,
        totalCorrectAnswers: correctAnswers,
        avgDuration: avgDuration,
        totalDuration: totalDuration,
        totalPoints: points,
        totalQuestions: state.questions.length,
        totalSkippedAnswers: state.questions.length - correctAnswers,
        totalWrongAnswers: state.questions.length - correctAnswers,
      };
      // console.log("scoreSummary", state.scoreSummary);

      console.log("Score summary --- completed");

      // set the isPlaying to false
    },
    timeoutQuestion(state) {
      // timeout the question
      state.currentQuestion!.is_answered = true;
      state.currentQuestion!.duration = state.currentQuestion!.timer;
      state.questions = state.questions.map((q) => {
        if (q.uid === state.currentQuestion!.uid) {
          q.is_answered = true;
          q.duration = state.currentQuestion!.timer;
          q.points = 0;
        }
        return q;
      });
      // set the current question answer
    },

    resetState(state) {
      state.currentQuestionPlayer = null;
      state.counter = 0;
      state.currentOrganization = null;
      state.currentQuestion = null;
      state.currentQuestionSet = null;
      state.organizations = [];
      state.isPlaying = false;
      state.questions = [];
      state.timer = 0;
      state.currentQuestionIndex = 0;
      state.scoreSummary = null;
      state.currentAnswers = [];
      localStorage.removeItem(stateKeys["tisini-app-quizState"]);
      localStorage.removeItem(stateKeys["tisini-app-quizState"]);
    },
  },
});

export const {
  loadOrganizations,
  loadQuestions,
  moveTonextQuestion,
  answerQuestion,
  finishQuiz,
  resetState,
  setCurreQuestionIndex,
  setCurrentOrganization,
  setCurrentQuerySet,
  syncCurrentQuestionDuration,
  syncState,
  timeoutQuestion,
  updateCounter,
} = quizStoreSlice.actions;

export default quizStoreSlice.reducer;
