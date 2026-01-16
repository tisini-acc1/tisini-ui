import { Cards, Stats } from "@/lib/types/scores";
import AccuracyRow from "../singleFixture/AccuracyRow";
import PosessionRow from "../singleFixture/PosessionRow";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";
import {
  calcRugbyPosession,
  getEvent,
  getStat,
  getSubEvent,
} from "@/lib/data/calculations";

type StatsProps = {
  home: Stats;
  away: Stats;
  cards: Cards;
  fixType: string;
};

const RugbyStats = ({ home, away, cards, fixType }: StatsProps) => {
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
    <>
      {fixType === "rugby7" ? (
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
            homeStat={getEvent(home, "58")}
            stat={"Carries"}
            awayStat={getEvent(away, "58")}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          />

          <AccuracyRow
            hComp={getEvent(home, "82")}
            aComp={getEvent(away, "82")}
            hTotal={homePasses}
            aTotal={awayPasses}
            stat={"Complete passes"}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          />

          <AccuracyRow
            hComp={getEvent(home, "56")}
            aComp={getEvent(away, "56")}
            hTotal={getEvent(home, "57") + getEvent(home, "56")}
            aTotal={getEvent(away, "57") + getEvent(away, "56")}
            stat={"Successful tackles"}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          />

          <StatsRow
            homeStat={getEvent(home, "60")}
            stat={"Penalties conceded"}
            awayStat={getEvent(away, "60")}
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
      ) : (
        <div className="flex flex-col space-y-6 ">
          <StatsHalf />

          {bothTeams && (
            <PosessionRow
              homeStat={`${posession.home}`}
              stat={"Possession"}
              awayStat={`${posession.away}`}
            />
          )}

          {/* <StatsRow
            homeStat={getEvent(home, "44")}
            stat={"Carries"}
            awayStat={getEvent(away, "44")}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          /> */}

          {/* <AccuracyRow
            hComp={getEvent(home, "91")}
            aComp={getEvent(away, "91")}
            hTotal={homePasses}
            aTotal={awayPasses}
            stat={"Complete passes"}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          /> */}

          {/* <AccuracyRow
            hComp={getEvent(home, "42")}
            aComp={getEvent(away, "42")}
            hTotal={getEvent(home, "43") + getEvent(home, "42")}
            aTotal={getEvent(away, "43") + getEvent(away, "42")}
            stat={"Successful tackles"}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          /> */}

          <StatsRow
            homeStat={getEvent(home, "104")}
            stat={"Visit in Opp 22"}
            awayStat={getEvent(away, "104")}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          />

          <StatsRow
            homeStat={getSubEvent(home, "49", "66")}
            stat={"Tries Scored"}
            awayStat={getSubEvent(away, "49", "66")}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          />

          <StatsRow
            homeStat={getEvent(home, "47")}
            stat={"Linebreaks"}
            awayStat={getEvent(away, "47")}
            homeOnly={homeOnly}
            awayOnly={awayOnly}
            bothTeams={bothTeams}
          />

          <StatsRow
            homeStat={getEvent(home, "105")}
            stat={"Territorial Kicks"}
            awayStat={getEvent(away, "105")}
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
      )}
    </>
  );
};

export default RugbyStats;
