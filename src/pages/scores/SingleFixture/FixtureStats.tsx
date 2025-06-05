import BasketballStats from "@/components/scores/stats/BasketballStats";
import FootballStats from "@/components/scores/stats/FootballStats";
import RugbyStats from "@/components/scores/stats/RugbyStats";
import { Cards, Fouls, Stats } from "@/lib/types/scores";

type StatsProps = {
  home: Stats;
  away: Stats;
  cards: Cards;
  fouls: Fouls;
  fixType: string;
};

const FixtureStats = ({ home, away, cards, fouls, fixType }: StatsProps) => {
  if (fixType === "football") {
    return (
      <FootballStats
        home={home as Stats}
        away={away as Stats}
        cards={cards as Cards}
        fouls={fouls as Fouls}
      />
    );
  } else if (fixType === "basketball") {
    return <BasketballStats home={home as Stats} away={away as Stats} />;
  }
  return (
    <RugbyStats
      home={home as Stats}
      away={away as Stats}
      cards={cards as Cards}
      fixType={fixType as string}
    />
  );
};

export default FixtureStats;
