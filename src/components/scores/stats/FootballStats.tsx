import AccuracyRow from "../singleFixture/AccuracyRow";
import { Cards, Fouls, Stats } from "@/lib/types/scores";
import PosessionRow from "../singleFixture/PosessionRow";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";
import {
  calcBallPosession,
  getStat,
  getSubEvent,
} from "@/lib/data/calculations";

type StatsProps = {
  home: Stats;
  away: Stats;
  cards: Cards;
  fouls: Fouls;
};

const FootballStats = ({ home, away, cards, fouls }: StatsProps) => {
  const posession = calcBallPosession(home, away);

  const homePass = home["Pass"].total;
  const awayPass = away["Pass"].total;

  const homeOnly = parseInt(awayPass) <= 0;
  const awayOnly = parseInt(homePass) <= 0;
  const bothTeams = parseInt(awayPass) > 0 && parseInt(homePass) > 0;

  const homePasses =
    parseInt(home["Pass"].total) + parseInt(home["Incomplete Pass"].total);
  const awayPasses =
    parseInt(away["Pass"].total) + parseInt(away["Incomplete Pass"].total);

  const homeTarget =
    getSubEvent(home, "Shot In-box", "On Target") +
    getSubEvent(home, "Shot Out-box", "On Target");
  const awayTarget =
    getSubEvent(away, "Shot Out-box", "On Target") +
    getSubEvent(away, "Shot In-box", "On Target");

  return (
    <div className="flex flex-col space-y-4 ">
      <StatsHalf />

      {bothTeams && (
        <PosessionRow
          homeStat={`${posession.home}`}
          stat={"Possession"}
          awayStat={`${posession.away}`}
        />
      )}

      <AccuracyRow
        hComp={homeTarget}
        aComp={awayTarget}
        hTotal={getStat(home, "Shot In-box") + getStat(home, "Shot Out-box")}
        aTotal={getStat(away, "Shot In-box") + getStat(away, "Shot Out-box")}
        stat={"Attempts on Target"}
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

      <StatsRow
        homeStat={getStat(home, "Corner")}
        stat={"Corner kicks"}
        awayStat={getStat(away, "Corner")}
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
    </div>
  );
};

export default FootballStats;
