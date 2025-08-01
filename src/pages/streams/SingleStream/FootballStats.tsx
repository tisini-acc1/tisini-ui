import { StatRow } from "./SingleStream";
import tisini from "@/assets/img/tisini-logo.png";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";
import { getEvent, getSubEvent } from "@/lib/data/calculations";

const FootballStats = ({ data }: { data: SingleFixtureStats }) => {
  //   const details = data?.fixture[0];
  const home = data?.home as Stats;
  const away = data?.away as Stats;
  //   const scores = data?.scores;
  // const lineups = data?.players;
  const cards = data?.cards;
  // const fouls = data?.fouls;
  // const highlights = data?.gamedetails;

  return (
    <div className="">
      {/* <StatRow
          hStat={hPosseession}
          title="possesion (%)"
          aStat={aPosseession}
        /> */}

      <StatRow
        hStat={getSubEvent(home, "165", "422")}
        title="Attempt on target"
        aStat={getSubEvent(away, "165", "422")}
      />

      <StatRow
        hStat={getSubEvent(home, "165", "423")}
        title="Attempt off target"
        aStat={getSubEvent(away, "165", "423")}
      />

      <StatRow
        hStat={getEvent(home, "203")}
        title="chances created"
        aStat={getEvent(away, "203")}
      />

      <StatRow
        hStat={getEvent(home, "155")}
        title="touches in opp box"
        aStat={getEvent(away, "155")}
      />

      <StatRow
        hStat={getEvent(home, "7")}
        title="Complete passes"
        aStat={getEvent(away, "7")}
      />

      <StatRow
        hStat={getEvent(home, "3")}
        title="Corner kicks"
        aStat={getEvent(away, "3")}
      />

      <StatRow
        hStat={getEvent(home, "10")}
        title="offsides"
        aStat={getEvent(away, "10")}
      />

      <StatRow
        hStat={getSubEvent(home, "11", "74")}
        title="fouls committed"
        aStat={getSubEvent(away, "11", "74")}
      />

      {cards && (cards.Homeyellow >= 1 || cards.Awayyellow >= 1) && (
        <StatRow
          hStat={`${cards?.Homeyellow}`}
          title="yellow cards"
          aStat={`${cards?.Awayyellow}`}
        />
      )}

      {cards && (cards.Homered >= 1 || cards.Awayred >= 1) && (
        <StatRow
          hStat={`${cards?.Homered}`}
          title="red cards"
          aStat={`${cards?.Awayred}`}
        />
      )}

      <div className="flex justify-end">
        <div className="flex gap-1 justify-center items-center">
          <div className="text-center font-semibold italic">Insights by:</div>
          <div className="mt-4">
            <img
              src={tisini}
              alt="Tisini"
              height={150}
              width={150}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballStats;
