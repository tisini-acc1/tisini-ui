import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

// import kawowo from "@/assets/img/kawowo.jpg";
import nile from "@/assets/img/nile 7s.png";
import varsity from "@/assets/img/varsity.png";
import legends from "@/assets/img/sportpesa.jpeg";
import tisini from "@/assets/img/tisini-logo.png";
import driftwood from "@/assets/tournaments/Dirftwood.png";
import { getStat, getSubEvent } from "@/lib/scores/calculations";

const SingleStream = () => {
  const { fixtureId, streamName } = useParams();

  const { data, isLoading, refetch } = useQuery<SingleFixtureStats, Error>(
    ["footballById", fixtureId],
    () => FetchFixtureById(fixtureId!),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    }
  );

  const img =
    streamName === "kawowo"
      ? nile
      : streamName === "varsity"
      ? varsity
      : streamName === "legends"
      ? legends
      : driftwood;

  useEffect(() => {
    if (data?.fixture[0].game_status === "ended") {
      refetch({ cancelRefetch: true });
    }
  }, [data, refetch]);

  const details = data?.fixture[0];
  const home = data?.home as Stats;
  const away = data?.away as Stats;
  const scores = data?.scores;
  // const lineups = data?.players;
  const cards = data?.cards;
  // const fouls = data?.fouls;
  // const highlights = data?.gamedetails;

  if (isLoading) return <Spinner />;

  // const hTackles = getStat(home, "Tackles") + getStat(home, "Missed tackles");
  // const aTackles = getStat(away, "Tackles") + getStat(away, "Missed tackles");

  // const hPasses = getStat(home, "Pass") + getStat(home, "Carries");
  // const aPasses = getStat(away, "Pass") + getStat(away, "Carries");
  // const totalPasses = hPasses + aPasses;
  // const hPosseession = Math.round((hPasses / totalPasses) * 100);
  // const aPosseession = Math.round((aPasses / totalPasses) * 100);

  const hLineoutsWon =
    getSubEvent(home, "Lineout throw", "Front won") +
    getSubEvent(home, "Lineout throw", "Middle won") +
    getSubEvent(home, "Lineout throw", "Back won") +
    getSubEvent(home, "Lineout throw", "Overthrow Won");
  const aLineoutsWon =
    getSubEvent(away, "Lineout throw", "Front won") +
    getSubEvent(away, "Lineout throw", "Middle won") +
    getSubEvent(away, "Lineout throw", "Back won") +
    getSubEvent(away, "Lineout throw", "Overthrow Won");

  const hScrumsWon = getSubEvent(home, "Scrums", "Won");
  const aScrumsWon = getSubEvent(away, "Scrums", "Won");

  return (
    <main className="pt-16 relative">
      <div className="absolute right-8 top-8">
        {/* <img src={kawowo} alt="kawowo" height={150} width={150} /> */}
      </div>

      <div className="w-[590px] mx-auto relative">
        <h1 className="text-sm font-extrabold text-center uppercase mb-14">
          {details?.game_status === "ended"
            ? "Full Time"
            : (details?.minute == "45" || details?.minute == "7") &&
              details?.game_moment == "secondhalf"
            ? "Half Time"
            : details?.minute}
        </h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-20 p-1 flex justify-center items-center border rounded-lg bg-white">
          <img src={img} alt="nile" className="w-full h-full object-cover" />
        </div>

        <div className="flex border rounded-full bg-red-500">
          <div className="w-[60px] flex items-center justify-center text-white font-bold text-2xl">
            {scores?.Home}
          </div>
          <div className="bg-white w-[470px] p-2 flex font-bold text-blue-800 text-lg uppercase">
            <div className="w-1/2  text-ellipsis whitespace-nowrap">
              {details?.team1_name}
            </div>
            <div className="w-1/4"></div>
            <div className="w-1/2 text-right text-ellipsis whitespace-nowrap">
              {details?.team2_name}
            </div>
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

        {/* <StatRow
          hStat={hPosseession}
          title="possesion (%)"
          aStat={aPosseession}
        /> */}

        <StatRow
          hStat={getSubEvent(home, "Score", "Try")}
          title="Tries scored"
          aStat={getSubEvent(away, "Score", "Try")}
        />

        <StatRow
          hStat={getSubEvent(home, "Score", "Successful Conversion")}
          title="successful conversions"
          aStat={getSubEvent(away, "Score", "Successful Conversion")}
        />

        <StatRow
          hStat={getStat(home, "Visit in opponents 22")}
          title="visit in opponents 22"
          aStat={getStat(away, "Visit in opponents 22")}
        />

        <StatRow
          hStat={getStat(home, "Penalties conceded")}
          title="penalties conceded"
          aStat={getStat(away, "Penalties conceded")}
        />

        <StatRow
          hStat={
            getStat(home, "Lost ball in carry") +
            getStat(home, "Knock ons") +
            getStat(home, "Knock on") +
            getStat(home, "Forward passes") +
            getStat(home, "Incomplete Pass")
          }
          title="handling errors"
          aStat={
            getStat(away, "Lost ball in carry") +
            getStat(away, "Knock ons") +
            getStat(away, "Knock on") +
            getStat(away, "Forward passes") +
            getStat(away, "Incomplete Pass")
          }
        />

        <StatRow
          hStat={`${hScrumsWon} / ${getStat(home, "Scrums")}`}
          title="scrums won / fed"
          aStat={`${aScrumsWon} / ${getStat(away, "Scrums")}`}
        />

        <StatRow
          hStat={`${hLineoutsWon} / ${getStat(home, "Lineout throw")}`}
          title="lineouts won / thrown"
          aStat={`${aLineoutsWon} / ${getStat(away, "Lineout throw")}`}
        />

        <StatRow
          hStat={getStat(home, "Turn overs")}
          title="turnovers won"
          aStat={getStat(away, "Turn overs")}
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
    <div className="flex mb-1 h-7">
      <div className="w-1/4 border text-center font-semibold text-blue-800 bg-white">
        {hStat}
      </div>
      <div className="w-1/2 mx-1 text-center flex justify-center items-center text-nowrap text-xs text-white font-bold uppercase bg-[#023270]">
        {title}
      </div>
      <div className="w-1/4 border text-center font-semibold text-blue-800 bg-white">
        {aStat}
      </div>
    </div>
  );
};
