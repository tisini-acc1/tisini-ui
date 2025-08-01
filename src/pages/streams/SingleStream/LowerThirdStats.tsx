import { getEvent, getStat, getSubEvent } from "@/lib/data/calculations";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

export const rugbyStats = (data: SingleFixtureStats) => {
  if (!data?.home || !data?.away) return [];

  const home = data.home as Stats;
  const away = data.away as Stats;
  const cards = data.cards;

  const hLineoutsWon =
    getSubEvent(home, "151", "377") +
    getSubEvent(home, "151", "378") +
    getSubEvent(home, "151", "379") +
    getSubEvent(home, "151", "391");
  const aLineoutsWon =
    getSubEvent(away, "151", "377") +
    getSubEvent(away, "151", "378") +
    getSubEvent(away, "151", "379") +
    getSubEvent(away, "151", "391");

  // scrum won + lost
  const hScrumsFed =
    getSubEvent(home, "51", "38") + getSubEvent(home, "51", "39");
  const aScrumsFed =
    getSubEvent(away, "51", "38") + getSubEvent(away, "51", "39");

  const statsList = [
    {
      stat: "Tries scored",
      home: getSubEvent(home, "49", "66"),
      away: getSubEvent(away, "49", "66"),
    },
    {
      stat: "successful conversions",
      home: getSubEvent(home, "49", "60"),
      away: getSubEvent(away, "49", "60"),
    },
    {
      stat: "Visit in opponents 22",
      home: getEvent(home, "104"),
      away: getEvent(away, "104"),
    },
    {
      stat: "Penalties conceded",
      home: getEvent(home, "46"),
      away: getEvent(away, "46"),
    },
    {
      stat: "Handling Errors",
      home:
        getEvent(home, "103") +
        getStat(home, "Knock ons") +
        getEvent(home, "41") +
        getEvent(home, "40") +
        getEvent(home, "87"),
      away:
        getEvent(away, "103") +
        getStat(away, "Knock ons") +
        getEvent(away, "41") +
        getEvent(away, "40") +
        getEvent(away, "87"),
    },
    {
      stat: "scrums won / fed",
      home: `${getSubEvent(home, "51", "38")} / ${hScrumsFed}`,
      away: `${getSubEvent(away, "51", "38")} / ${aScrumsFed}`,
    },
    {
      stat: "lineouts won / thrown",
      home: `${hLineoutsWon} / ${getEvent(home, "151")}`,
      away: `${aLineoutsWon} / ${getEvent(away, "151")}`,
    },
    {
      stat: "Turnovers Won",
      home: getEvent(home, "45"),
      away: getEvent(away, "45"),
    },

    // {
    //   stat: "Passes",
    //   home: getStat(home, "Pass"),
    //   away: getStat(away, "Pass"),
    // },
    // {
    //   stat: "Carries",
    //   home: getStat(home, "Carries"),
    //   away: getStat(away, "Carries"),
    // },
    // {
    //   stat: "Line Breaks",
    //   home: getStat(home, "Linebreak"),
    //   away: getStat(away, "Linebreak"),
    // },
    // {
    //   stat: "Offloads",
    //   home: getStat(home, "Offloads"),
    //   away: getStat(away, "Offloads"),
    // },
    // {
    //   stat: "Kicks",
    //   home: getStat(home, "Kick for territory"),
    //   away: getStat(away, "Kick for territory"),
    // },
  ];

  (cards.Homeyellow >= 1 || cards.Awayyellow >= 1) &&
    statsList.push({
      stat: "Yellow cards",
      home: `${cards.Homeyellow}`,
      away: `${cards.Awayyellow}`,
    });

  (cards.Homered >= 1 || cards.Awayred >= 1) &&
    statsList.push({
      stat: "red cards",
      home: `${cards.Homered}`,
      away: `${cards.Awayred}`,
    });

  return statsList;
};

export const footballStats = (data: SingleFixtureStats) => {
  if (!data?.home || !data?.away) return [];

  const home = data.home as Stats;
  const away = data.away as Stats;
  const cards = data.cards;

  const statsList = [
    {
      stat: "Attempts on target",
      home: getSubEvent(home, "165", "422"),
      away: getSubEvent(away, "165", "422"),
    },
    {
      stat: "Attempt off target",
      home: getSubEvent(home, "165", "423"),
      away: getSubEvent(away, "165", "423"),
    },
    {
      home: getEvent(home, "203"),
      stat: "chances created",
      away: getEvent(away, "203"),
    },
    {
      home: getEvent(home, "155"),
      stat: "touches in opp box",
      away: getEvent(away, "155"),
    },
    {
      home: getEvent(home, "7"),
      stat: "Complete passes",
      away: getEvent(away, "7"),
    },
    {
      home: getEvent(home, "3"),
      stat: "Corner kicks",
      away: getEvent(away, "3"),
    },
    {
      home: getEvent(home, "10"),
      stat: "offsides",
      away: getEvent(away, "10"),
    },
    {
      home: getSubEvent(home, "11", "74"),
      stat: "fouls committed",
      away: getSubEvent(away, "11", "74"),
    },
  ];

  (cards.Homeyellow >= 1 || cards.Awayyellow >= 1) &&
    statsList.push({
      stat: "Yellow cards",
      home: cards.Homeyellow,
      away: cards.Awayyellow,
    });

  (cards.Homered >= 1 || cards.Awayred >= 1) &&
    statsList.push({
      stat: "red cards",
      home: cards.Homered,
      away: cards.Awayred,
    });

  return statsList;
};
