type UID = string;
type CategoryName = string;
type QuizType = 'PR';
type PlayerID = number;
type PlayerNickname = string;
type PlayerFirstName = string;
type PlayerLastName = string;
type QuestionAbbrev = string;
type UserAnswer = string;
type AnswerMarker = "IC" | "IW" | null;
type Points = number;
type TimeUsed = number | null;

interface QPlayer {
  id: PlayerID;
  nickname: PlayerNickname;
  first_name: PlayerFirstName;
  last_name: PlayerLastName;
}

interface MarkedUserAnswer {
  id: number;
  question_abbrev: QuestionAbbrev;
  user_answer: UserAnswer;
  answer_marker: AnswerMarker;
}

interface QuestionPlayer {
  id: number;
  q_player: QPlayer;
  marked_useranswers: MarkedUserAnswer[];
  points_earned: Points;
  time_used: TimeUsed;
}

export interface Leaderboard2QuizData {
  uid: UID;
  category_name: CategoryName;
  quiz_type: QuizType;
  question_players: QuestionPlayer[];
}
