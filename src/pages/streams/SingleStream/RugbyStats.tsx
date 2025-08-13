import { StatRow } from "./SingleStream";
import tisini from "@/assets/img/tisini-logo.png";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";
import { getEvent, getStat, getSubEvent } from "@/lib/data/calculations";

const RugbyStats = ({ data }: { data: SingleFixtureStats }) => {
  const details = data?.fixture[0];
  const home = data?.home as Stats;
  const away = data?.away as Stats;
  //   const scores = data?.scores;
  // const lineups = data?.players;
  const cards = data?.cards;
  // const fouls = data?.fouls;
  // const highlights = data?.gamedetails;

  // console.log(home);

  return (
    <div className="">
      {details.fixture_type === "rugby15" ? (
        <>
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
            hStat={`${getSubEvent(home, "51", "38")} / ${
              getSubEvent(home, "51", "38") + getSubEvent(home, "51", "39")
            }`}
            title="scrums won / fed"
            aStat={`${getSubEvent(away, "51", "38")} / ${
              getSubEvent(away, "51", "38") + getSubEvent(away, "51", "39")
            }`}
          />

          <StatRow
            hStat={`${
              getSubEvent(home, "151", "377") +
              getSubEvent(home, "151", "378") +
              getSubEvent(home, "151", "379") +
              getSubEvent(home, "151", "391")
            } / ${getEvent(home, "151")}`}
            title="lineouts won / thrown"
            aStat={`${
              getSubEvent(away, "151", "377") +
              getSubEvent(away, "151", "378") +
              getSubEvent(away, "151", "379") +
              getSubEvent(away, "151", "391")
            } / ${getEvent(away, "151")}`}
          />

          <StatRow
            hStat={getEvent(home, "45")}
            title="turnovers won"
            aStat={getEvent(away, "45")}
          />
        </>
      ) : (
        <>
          <StatRow
            hStat={getSubEvent(home, "33", "51")}
            title="Tries scored"
            aStat={getSubEvent(away, "33", "51")}
          />

          <StatRow
            hStat={getSubEvent(home, "33", "52")}
            title="successful conversions"
            aStat={getSubEvent(away, "33", "52")}
          />

          <StatRow
            hStat={getEvent(home, "122")}
            title="visit in opponents 22"
            aStat={getEvent(away, "122")}
          />

          <StatRow
            hStat={getEvent(home, "60")}
            title="penalties conceded"
            aStat={getEvent(away, "60")}
          />

          <StatRow
            hStat={
              getEvent(home, "149") +
              getStat(home, "Knock ons") +
              getEvent(home, "35") +
              getEvent(home, "36") +
              getEvent(home, "86")
            }
            title="handling errors"
            aStat={
              getEvent(away, "149") +
              getStat(away, "Knock ons") +
              getEvent(away, "35") +
              getEvent(away, "36") +
              getEvent(away, "86")
            }
          />

          <StatRow
            hStat={`${getSubEvent(home, "63", "47")} / ${
              getSubEvent(home, "63", "47") + getSubEvent(home, "63", "48")
            }`}
            title="scrums won / fed"
            aStat={`${getSubEvent(away, "63", "47")} / ${
              getSubEvent(away, "63", "47") + getSubEvent(away, "63", "48")
            }`}
          />

          <StatRow
            hStat={`${
              getSubEvent(home, "150", "371") +
              getSubEvent(home, "150", "372") +
              getSubEvent(home, "150", "373") +
              getSubEvent(home, "150", "389")
            } / ${getEvent(home, "150")}`}
            title="lineouts won / thrown"
            aStat={`${
              getSubEvent(away, "150", "371") +
              getSubEvent(away, "150", "372") +
              getSubEvent(away, "150", "373") +
              getSubEvent(away, "150", "389")
            } / ${getEvent(away, "150")}`}
          />

          <StatRow
            hStat={getEvent(home, "59")}
            title="turnovers won"
            aStat={getEvent(away, "59")}
          />
        </>
      )}

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
