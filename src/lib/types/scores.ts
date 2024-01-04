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

export type FixtureStats = [
  [FixtureDetails],
  [Stats[]],
  [Stats[]],
  Scores,
  [],
  Cards,
  Fouls,
  []
];

export type GroupByDate = {
  [date: string]: Fixture[];
};

export type GroupedFixtures = {
  [date: string]: {
    [league: string]: Fixture[];
  };
};

export type FixturesArray = [string, Fixture[]];
