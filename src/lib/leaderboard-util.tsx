import {
  GenericLeaderBoardData,
  NormalLeaderBoard,
  PredictiveLeaderBoard,
} from "./types";

export function convertLeaderBoardData<T = unknown>(
  data: T extends "NR"
    ? NormalLeaderBoard
    : T extends "PR"
    ? PredictiveLeaderBoard
    : never,
  t: T
) {
  // const { type, ...rest } = data as any;
  type PossibleTupleT = "Predictive" | "Normal" | "Unknown";
  const res = {
    data: data as GenericLeaderBoardData<T>,
    type:
      t === "NR"
        ? "Normal"
        : t === "PR"
        ? "Predictive"
        : ("Unknown" as PossibleTupleT),
  };
  return res;
}

export function processPredictiveLeaderboard(
  leaderboard: PredictiveLeaderBoard
) {
  const { question_players } = leaderboard;

  const players = question_players.map((player) => {
    const { q_player, questions, points_earned, time_used, score } = player;
    const { nickname, profile_pic } = q_player;
const sortedQuestions = questions.sort((a,b)=>a.question_text.uid.localeCompare(b.question_text.uid))
    const answers =
    sortedQuestions && Array.isArray(sortedQuestions)
        ? sortedQuestions.map((question) => {
            const { question_text, user_answers, } = question;
            const { question_abbrev } = question_text;

            const answer = user_answers[0];
            type AnswerStatus = "c" | "w" | "p";
            return {
              question: question_abbrev.names,
              user_answer: answer.answer_text,
              // correct_answer: answer.answer_marker,
              status:
                answer.answer_marker === "IC"
                  ? "c"
                  : answer.answer_marker === "IW"
                  ? "w"
                  : ("p" as AnswerStatus),
            };
          })
        : [];

    return {
      nickname,
      profile_pic,
      answers,
      points_earned,
      time_used,
      score,
    };
  });

  return players;
}
