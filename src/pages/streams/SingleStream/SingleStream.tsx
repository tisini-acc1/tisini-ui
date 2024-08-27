import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

import kawowo from "@/assets/img/kawowo.jpg";
import tisini from "@/assets/img/tisini.png";
import league from "@/assets/img/nile-special.png";
import { getStat } from "@/lib/scores/calculations";

const SingleStream = () => {
  const { fixtureId } = useParams();

  const { data, isLoading } = useQuery<SingleFixtureStats, Error>(
    ["footballById"],
    () => FetchFixtureById(fixtureId!)
  );

  const details = data?.fixture[0];
  const home = data?.home as Stats;
  const away = data?.away as Stats;
  const scores = data?.scores;
  // const lineups = data?.players;
  // const cards = data?.cards;
  // const fouls = data?.fouls;
  // const highlights = data?.gamedetails;

  if (isLoading) return <Spinner />;

  const hTackles = getStat(home, "Tackles") + getStat(home, "Missed tackles");
  const aTackles = getStat(away, "Tackles") + getStat(away, "Missed tackles");

  const hLineoutsWon = home["Lineouts"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  const aLineoutsWon = away["Lineouts"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  const hScrumsWon = home["Scrums"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  const aScrumsWon = away["Scrums"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  return (
    <main className="pt-16 relative">
      <div className="absolute right-8 top-8">
        <img src={kawowo} alt="kawowo" height={150} width={150} />
      </div>

      <div className="w-[590px] mx-auto relative">
        <h1 className="text-sm font-bold text-center uppercase m-8">
          {details?.game_status === "ended"
            ? "Full Time"
            : details?.minute == "45" && details?.game_moment == "secondhalf"
            ? "Half Time"
            : details?.minute}
        </h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] flex justify-center items-center border rounded-lg bg-blue-400">
          <img src={league} alt="nile" height={60} width={60} />
        </div>

        <div className="flex border rounded-full bg-red-500">
          <div className="w-[60px] flex items-center justify-center text-white font-bold text-2xl">
            {scores?.Home}
          </div>
          <div className="bg-white w-[470px] p-4 flex justify-between font-bold text-blue-800 text-xl uppercase">
            <div>{details?.team1_name}</div>
            <div>{details?.team2_name}</div>
          </div>
          <div className="w-[60px] flex items-center justify-center text-white font-bold text-2xl">
            {scores?.Away}
          </div>
        </div>
      </div>

      <div className="w-[480px] mx-auto">
        <h1 className="text-xl font-bold text-center uppercase m-3">
          Match Statistics
        </h1>

        <StatRow
          hStat={getStat(home, "Pass")}
          title="passes"
          aStat={getStat(away, "Pass")}
        />

        <StatRow
          hStat={getStat(home, "Carries")}
          title="carries"
          aStat={getStat(away, "Carries")}
        />

        <StatRow
          hStat={getStat(home, "Visit in own 22")}
          title="visit in 22"
          aStat={getStat(away, "Visit in own 22")}
        />

        <StatRow
          hStat={getStat(home, "Turn overs")}
          title="turnovers won"
          aStat={getStat(away, "Turn overs")}
        />

        <StatRow
          hStat={
            getStat(home, "Lost ball in carry") +
            getStat(home, "Knock ons") +
            getStat(home, "Forward passes") +
            getStat(home, "Incomplete Pass")
          }
          title="handling errors"
          aStat={
            getStat(away, "Lost ball in carry") +
            getStat(away, "Knock ons") +
            getStat(away, "Forward passes") +
            getStat(away, "Incomplete Pass")
          }
        />

        <StatRow
          hStat={`${getStat(home, "Tackles")} / ${hTackles}`}
          title="tackles made/missed"
          aStat={`${getStat(away, "Tackles")} / ${aTackles}`}
        />

        <StatRow
          hStat={getStat(home, "Penalties conceded")}
          title="penalties"
          aStat={getStat(away, "Penalties conceded")}
        />

        <StatRow
          hStat={`${hLineoutsWon[0].totalsubevent} / ${getStat(
            home,
            "Lineouts"
          )}`}
          title="lineouts won/lost"
          aStat={`${aLineoutsWon[0].totalsubevent} / ${getStat(
            away,
            "Lineouts"
          )}`}
        />

        <StatRow
          hStat={`${hScrumsWon[0].totalsubevent} / ${getStat(home, "Scrums")}`}
          title="scrums won/lost"
          aStat={`${aScrumsWon[0].totalsubevent} / ${getStat(away, "Scrums")}`}
        />

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
    </main>
  );
};

export default SingleStream;

const StatRow = ({
  hStat,
  title,
  aStat,
}: {
  hStat: string | number;
  title: string;
  aStat: string | number;
}) => {
  return (
    <div className="flex mb-1">
      <div className="w-1/3 border text-center font-semibold text-blue-800 bg-white">
        {hStat}
      </div>
      <div className="w-1/3 border mx-1 text-center flex justify-center items-center text-nowrap text-xs text-white font-bold uppercase bg-blue-400">
        {title}
      </div>
      <div className="w-1/3 border text-center font-semibold text-blue-800 bg-white">
        {aStat}
      </div>
    </div>
  );
};
