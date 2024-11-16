import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/data/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

import tisini from "@/assets/img/tisini-logo.png";
import leagueLogo from "@/assets/tournaments/rugby.jpeg";
import { leagues } from "@/lib/constants/site_images";
import { getEvent, getStat, getSubEvent } from "@/lib/data/calculations";

const SingleStream = () => {
  const { fixtureId } = useParams();

  const { data, isLoading, refetch } = useQuery<SingleFixtureStats, Error>(
    ["footballById", fixtureId],
    () => FetchFixtureById(fixtureId!),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    }
  );

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

  const img = leagues[details?.leagueid as string] ?? leagueLogo;

  if (isLoading) return <Spinner />;

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

  // scrum won + lost
  const hScrumsFed = hScrumsWon + getSubEvent(home, "51", "39");
  const aScrumsFed = aScrumsWon + getSubEvent(away, "51", "39");

  return (
    <main className="pt-16 relative">
      <div className="absolute right-8 top-8">
        {/* <img src={kawowo} alt="kawowo" height={150} width={150} /> */}
      </div>

      <div className="w-[590px] mx-auto relative">
        <h1 className="text-sm font-extrabold text-center uppercase mb-14">
          {details?.game_status === "ended" || details?.game_status === "FT"
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
