import { Cards, Fouls, Stats } from "@/lib/types/scores";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";
import {
  calcPosession,
  getStat,
  passAccuracy,
} from "@/lib/scores/calculations";
import PosessionRow from "../singleFixture/PosessionRow";

type StatsProps = {
  home: Stats[];
  away: Stats[];
  cards: Cards;
  fouls: Fouls;
};

const FootballStats = ({ home, away, cards, fouls }: StatsProps) => {
  const posession = calcPosession(home, away);

  const homeOnly = home.length > 1 && away.length == 0;
  const awayOnly = away.length > 1 && home.length == 0;
  const bothTeams = away.length > 1 && home.length > 1;

  return (
    <div className="flex flex-col space-y-2 bg-red-400">
      <StatsHalf />

      {home.length !== 0 && away.length !== 0 && (
        <PosessionRow
          homeStat={`${posession.home}`}
          stat={"Possession"}
          awayStat={`${posession.away}`}
        />
      )}

      <StatsRow
        homeStat={getStat(home, "Shot")}
        stat={"Attempts"}
        awayStat={getStat(away, "Shot")}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={
          getStat(home, "Pass") +
          getStat(home, "Incomplete Pass") +
          getStat(home, "Progress Pass")
        }
        stat={"Total passes"}
        awayStat={
          getStat(away, "Pass") +
          getStat(away, "Incomplete Pass") +
          getStat(away, "Progress Pass")
        }
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={
          !passAccuracy(home, "Pass", "Incomplete Pass")
            ? 0
            : `${passAccuracy(home, "Pass", "Incomplete Pass")}%`
        }
        stat={"Pass accuracy"}
        awayStat={
          !passAccuracy(away, "Pass", "Incomplete Pass")
            ? 0
            : `${passAccuracy(away, "Pass", "Incomplete Pass")}%`
        }
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={fouls.Homecommitted}
        stat={"Fouls"}
        awayStat={fouls.Awaycommitted}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={cards.Homeyellow}
        stat={"Yellow cards"}
        awayStat={cards.Awayyellow}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={cards.Homered}
        stat={"Red cards"}
        awayStat={cards.Awayred}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={getStat(home, "Offside")}
        stat={"Offsides"}
        awayStat={getStat(away, "Offside")}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={getStat(home, "Corner")}
        stat={"Corner kicks"}
        awayStat={getStat(away, "Corner")}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />
    </div>
  );
};

export default FootballStats;
