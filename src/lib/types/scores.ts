import { ComponentType } from "react";

export type Fixture = {
  id: string;
  team1_id: string;
  team2_id: string;
  game_date: string;
  referee: string;
  team1_name: string;
  team2_name: string;
  status: string;
  game_status: string;
  minute: string;
  second: string;
  game_moment: string;
  league: string;
  home_score: string;
  away_score: string;
  matchday: string;
  fixture_type: string;
  series: string;
};

export type FixtureDetails = {
  fixture_type: string;
  game_date: string;
  game_moment: string;
  game_status: string;
  id: string;
  league: string;
  leagueid: string;
  live: string;
  matchday: string;
  minute: string;
  second: string;
  series: string;
  team1_id: string;
  team1_name: string;
  team2_id: string;
  team2_name: string;
  teamview: string;
};

export type Stats = {
  event_id: string;
  gameid: string;
  id: string;
  name: string;
  team: string;
  time: string;
  total: string;
};

export type Scores = {
  Away: string;
  Home: string;
};

export type Cards = {
  Awayred: number;
  Awayyellow: number;
  Homered: number;
  Homeyellow: number;
};

export type Fouls = {
  Awaycommitted: number;
  Awaywon: number;
  Homecommitted: number;
  Homewon: number;
};

export type Lineup = {
  Jersey_No: string;
  fixture_id: string;
  id: string;
  last_updated: string;
  player_id: string;
  player_type: string;
  pname: string;
  teamId: string;
  team_player_id: string;
  lineupposition: string;
};

export type SingleFixtureStats = [
  [FixtureDetails],
  Stats[],
  Stats[],
  Scores,
  Lineup[],
  Cards,
  Fouls,
  []
];

export type FixtureStats = [
  [FixtureDetails],
  Stats[],
  Stats[],
  Scores,
  [],
  Cards,
  Fouls,
  []
];

export type Standings = {
  position: number;
  team_name: string;
  year: string;
  round1: string;
  round2: string;
  round3: string;
  round4: string;
  round5: string;
  round6: string;
  totalpts: string;
  league: string;
};

export type GroupByDate = {
  [date: string]: Fixture[];
};

export type GroupedFixtures = {
  [date: string]: {
    [league: string]: Fixture[];
  };
};

export type FixturesArray = [string, Fixture[]];

export type Question = {
  id: number;
  question: string;
  answer: string;
};

export type Social = {
  name: string;
  icon: ComponentType;
  link: string;
};

// export type Links = { name: string; link: string };

export type contacts = { icon: ComponentType; contact: string };

export type TFooter = {
  logo: string;
  socials: Social[];
  contacts: contacts[];
};

export type THero = {
  title: string;
  subtitle: string;
  buttonText: string;
};

export type Tournament = {
  logo: string;
  hero: THero;
  about: string;
  questions: Question[];
  footer: TFooter;

  // other tournament details
};

export type TournamentData = {
  [key: string]: Tournament;
};
