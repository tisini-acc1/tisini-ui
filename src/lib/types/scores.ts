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
  game_time: string;
  minute: string;
  second: string;
  game_moment: string;
  game_minute: string;
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

export type SubEvent = {
  subeventid: string;
  subeventname: string;
  totalsubevent: string;
  team: string;
  gameidid: string;
};

export type Event = {
  event_id: string;
  name: string;
  total: string;
  team: string;
  fixtureid: string;
  "sub-event": SubEvent[];
};

export type Stats = {
  [eventName: string]: Event;
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
  red: string;
};

export type GameHighlights = {
  event_name: string;
  event_id: string;
  team: string;
  gameid: string;
  narration: string;
  player_id: string;
  subevent_id: string;
  subeventName: string;
  subplayer_id: string;
  subplayer_name: string;
  game_minute: string;
  game_second: string;
  game_moment: string;
  teamplayer_id: string;
  player_type: string;
  pname: string;
  Jersey_No: string;
  subsubevent_id: string;
  zone_id: null;
  tss: null;
};

export type SingleFixtureStats = {
  fixture: FixtureDetails[];
  home: Stats;
  away: Stats;
  scores: Scores;
  players: Lineup[];
  cards: Cards;
  fouls: Fouls;
  standing: [];
  gamedetails: GameHighlights[];
};

export type Live = {
  opponent: string;
  score: string;
  status: string;
};

export type Standing = {
  team: string;
  D: number;
  GA: number;
  GD: number;
  GF: number;
  L: number;
  P: number;
  Pts: number;
  W: number;
  live: Live | null;
};

export type SerieStanding = {
  created_by: string;
  date_created: string;
  date_from: string;
  date_updated: string;
  id: string;
  name: string;
  ranker: string;
  status: string;
  tournament: string;
  standings: Standing[];
};

export type TournamentStanding = {
  date_created: string;
  date_updated: string;
  fixture_type: string;
  fixturetype: string;
  is_competitive: string;
  leaguelogo: string;
  position: string;
  status: string;
  tournament: string;
  tournament_id: string;
  series: SerieStanding[];
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

export type TAbout = {
  theme: string;
  image: string;
  story: string[];
};

export type Tournament = {
  logo: string;
  hero: THero;
  about: TAbout;
  questions: Question[];
  footer: TFooter;

  // other tournament details
};

export type TournamentData = {
  [key: string]: Tournament;
};
