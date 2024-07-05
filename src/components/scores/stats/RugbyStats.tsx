import { Cards, Stats } from "@/lib/types/scores";
import AccuracyRow from "../singleFixture/AccuracyRow";
import PosessionRow from "../singleFixture/PosessionRow";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import { calcPosession, getStat } from "@/lib/scores/calculations";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";

type StatsProps = {
  home: Stats[];
  away: Stats[];
  cards: Cards;
};

const RugbyStats = ({ home, away, cards }: StatsProps) => {
  const posession = calcPosession(home, away);

  const homeOnly = home.length > 1 && away.length == 0;
  const awayOnly = away.length > 1 && home.length == 0;
  const bothTeams = away.length > 1 && home.length > 1;

  const homePasses =
    getStat(home, "Pass") +
    getStat(home, "Incomplete Pass") +
    getStat(home, "Forward pass");
  const awayPasses =
    getStat(away, "Pass") +
    getStat(away, "Incomplete Pass") +
    getStat(away, "Forward pass");

  if (home.length < 1 && away.length < 1) {
    return (
      <div className="flex justify-center items-center text-xl font-bold h-96">
        No Data!
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 ">
      <StatsHalf />

      {home.length !== 0 && away.length !== 0 && (
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
