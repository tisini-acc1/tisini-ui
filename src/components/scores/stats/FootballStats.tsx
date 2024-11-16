import AccuracyRow from "../singleFixture/AccuracyRow";
import { Cards, Fouls, Stats } from "@/lib/types/scores";
import PosessionRow from "../singleFixture/PosessionRow";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";
import {
  calcBallPosession,
  getEvent,
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
    getSubEvent(home, "165", "422") + getSubEvent(home, "156", "405");
  const awayTarget =
    getSubEvent(away, "156", "405") + getSubEvent(away, "165", "422");

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
        hTotal={getEvent(home, "165") + getEvent(home, "156")}
        aTotal={getEvent(away, "165") + getEvent(away, "156")}
        stat={"Attempts on Target"}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <AccuracyRow
        hComp={getEvent(home, "7")}
        aComp={getEvent(away, "7")}
        hTotal={homePasses}
        aTotal={awayPasses}
        stat={"Complete passes"}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={getEvent(home, "3")}
        stat={"Corner kicks"}
        awayStat={getEvent(away, "3")}
        homeOnly={homeOnly}
        awayOnly={awayOnly}
        bothTeams={bothTeams}
      />

      <StatsRow
        homeStat={getEvent(home, "10")}
        stat={"Offsides"}
        awayStat={getEvent(away, "10")}
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
