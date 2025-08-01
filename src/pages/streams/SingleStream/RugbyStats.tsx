import { StatRow } from "./SingleStream";
import tisini from "@/assets/img/tisini-logo.png";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";
import { getEvent, getStat, getSubEvent } from "@/lib/data/calculations";

const RugbyStats = ({ data }: { data: SingleFixtureStats }) => {
  //   const details = data?.fixture[0];
  const home = data?.home as Stats;
  const away = data?.away as Stats;
  //   const scores = data?.scores;
  // const lineups = data?.players;
  const cards = data?.cards;
  // const fouls = data?.fouls;
  // const highlights = data?.gamedetails;

  // const hTackles = getStat(home, "Tackles") + getStat(home, "Missed tackles");
  // const aTackles = getStat(away, "Tackles") + getStat(away, "Missed tackles");

  // const hPasses = getStat(home, "Pass") + getStat(home, "Carries");
  // const aPasses = getStat(away, "Pass") + getStat(away, "Carries");
  // const totalPasses = hPasses + aPasses;
  // const hPosseession = Math.round((hPasses / totalPasses) * 100);
  // const aPosseession = Math.round((aPasses / totalPasses) * 100);

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

  const hScrumsWon = getSubEvent(home, "51", "38");
  const aScrumsWon = getSubEvent(away, "51", "38");

  // scrum fed = won + lost
  const hScrumsFed = hScrumsWon + getSubEvent(home, "51", "39");
  const aScrumsFed = aScrumsWon + getSubEvent(away, "51", "39");

  return (
    <div className="">
      {/* <StatRow
          hStat={hPosseession}
          title="possesion (%)"
          aStat={aPosseession}
        /> */}

      <StatRow
        hStat={getSubEvent(home, "49", "66")}
        title="Tries scored"
        aStat={getSubEvent(away, "49", "66")}
      />

      <StatRow
        hStat={getSubEvent(home, "49", "60")}
        title="successful conversions"
        aStat={getSubEvent(away, "49", "60")}
      />

      <StatRow
        hStat={getEvent(home, "104")}
        title="visit in opponents 22"
        aStat={getEvent(away, "104")}
      />

      <StatRow
        hStat={getEvent(home, "46")}
        title="penalties conceded"
        aStat={getEvent(away, "46")}
      />

      <StatRow
        hStat={
          getEvent(home, "103") +
          getStat(home, "Knock ons") +
          getEvent(home, "41") +
          getEvent(home, "40") +
          getEvent(home, "87")
        }
        title="handling errors"
        aStat={
          getEvent(away, "103") +
          getStat(away, "Knock ons") +
          getEvent(away, "41") +
          getEvent(away, "40") +
          getEvent(away, "87")
        }
      />

      <StatRow
        hStat={`${hScrumsWon} / ${hScrumsFed}`}
        title="scrums won / fed"
        aStat={`${aScrumsWon} / ${aScrumsFed}`}
      />

      <StatRow
        hStat={`${hLineoutsWon} / ${getEvent(home, "151")}`}
        title="lineouts won / thrown"
        aStat={`${aLineoutsWon} / ${getEvent(away, "151")}`}
      />

      <StatRow
        hStat={getEvent(home, "45")}
        title="turnovers won"
        aStat={getEvent(away, "45")}
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

      {/* <StatRow
          hStat={`${getStat(home, "Tackles")} / ${hTackles}`}
          title="tackles made"
          aStat={`${getStat(away, "Tackles")} / ${aTackles}`}
        /> */}

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

export default RugbyStats;
