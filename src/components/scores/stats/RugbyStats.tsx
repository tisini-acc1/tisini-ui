import { Cards, Stats } from "@/lib/types/scores";
import AccuracyRow from "../singleFixture/AccuracyRow";
import PosessionRow from "../singleFixture/PosessionRow";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";
import { calcRugbyPosession, getEvent, getStat } from "@/lib/data/calculations";

type StatsProps = {
  home: Stats;
  away: Stats;
  cards: Cards;
};

const RugbyStats = ({ home, away, cards }: StatsProps) => {
  const posession = calcRugbyPosession(home, away);

  const homePass = home["Pass"].total;
  const awayPass = away["Pass"].total;

  const homeOnly = parseInt(awayPass) <= 0;
  const awayOnly = parseInt(homePass) <= 0;
  const bothTeams = parseInt(awayPass) > 0 && parseInt(homePass) > 0;

  const homePasses =
    getStat(home, "Pass") +
    getStat(home, "Incomplete Pass") +
    getStat(home, "Forward pass");
  const awayPasses =
    getStat(away, "Pass") +
    getStat(away, "Incomplete Pass") +
    getStat(away, "Forward pass");

  return (
    <div className="flex flex-col space-y-6 ">
      <StatsHalf />

      {bothTeams && (
        <PosessionRow
          homeStat={`${posession.home}`}
          stat={"Possession"}
          awayStat={`${posession.away}`}
        />
      )}

      <StatsRow
        homeStat={getEvent(home, "44")}
        stat={"Carries"}
        awayStat={getEvent(away, "44")}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <AccuracyRow
        hComp={getEvent(home, "91")}
        aComp={getEvent(away, "91")}
        hTotal={homePasses}
        aTotal={awayPasses}
        stat={"Complete passes"}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <AccuracyRow
        hComp={getEvent(home, "42")}
        aComp={getEvent(away, "42")}
        hTotal={getEvent(home, "43") + getEvent(home, "42")}
        aTotal={getEvent(away, "43") + getEvent(away, "42")}
        stat={"Successful tackles"}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={getEvent(home, "46")}
        stat={"Penalties conceded"}
        awayStat={getEvent(away, "46")}
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
    </div>
  );
};

export default RugbyStats;
