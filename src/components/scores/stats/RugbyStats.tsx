import { Cards, Stats } from "@/lib/types/scores";
import AccuracyRow from "../singleFixture/AccuracyRow";
import PosessionRow from "../singleFixture/PosessionRow";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import { calcRugbyPosession, getStat } from "@/lib/data/calculations";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";

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
  console.log(home["Pass"].total);
  console.log(getStat(home, "Forward pass"));
  console.log(away["Pass"].total);
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
        homeStat={getStat(home, "Carries")}
        stat={"Carries"}
        awayStat={getStat(away, "Carries")}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <AccuracyRow
        hComp={getStat(home, "Pass")}
        aComp={getStat(away, "Pass")}
        hTotal={homePasses}
        aTotal={awayPasses}
        stat={"Complete passes"}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <AccuracyRow
        hComp={getStat(home, "Tackles")}
        aComp={getStat(away, "Tackles")}
        hTotal={getStat(home, "Missed tackles") + getStat(home, "Tackles")}
        aTotal={getStat(away, "Missed tackles") + getStat(away, "Tackles")}
        stat={"Successful tackles"}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={getStat(home, "Penalties conceded")}
        stat={"Penalties conceded"}
        awayStat={getStat(away, "Penalties conceded")}
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
