import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import RugbyStats from "./RugbyStats";
import FootballStats from "./FootballStats";
import Spinner from "@/components/spinner/Spinner";
import { SingleFixtureStats } from "@/lib/types/scores";
import FetchFixtureById from "@/lib/data/FetchFixtureById";

import tisini from "@/assets/img/tisini-logo.png";
// import { leagues } from "@/lib/constants/site_images";
import ballLogo from "@/assets/tournaments/t-logo.png";
import rugbyBall from "@/assets/tournaments/rugby.jpeg";
import christie from "@/assets/tournaments/christie.webp";

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

  const scores = data?.scores;
  const details = data?.fixture[0];
  const fixType = data?.fixture[0].fixture_type;

  // const logo = leagues[details?.leagueid as string];
  const defaultLogo =
    fixType === "rugby7"
      ? christie
      : fixType === "football"
      ? ballLogo
      : fixType === "rugby15" || fixType === "rugby10"
      ? rugbyBall
      : tisini;

  // const img = logo ?? defaultLogo;

  if (isLoading) return <Spinner />;

  return (
    <main className="pt-16 relative">
      <div className="absolute right-8 top-8">
        {/* <img src={kawowo} alt="kawowo" height={150} width={150} /> */}
      </div>

      <div className="w-[650px] mx-auto relative">
        <h1 className="text-sm font-extrabold text-center uppercase mb-14">
          {details?.game_status === "ended" || details?.game_status === "FT"
            ? "Full Time"
            : (details?.minute == "45" || details?.minute == "7") &&
              details?.game_moment == "secondhalf"
            ? "Half Time"
            : details?.minute}
        </h1>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-20 p-1 flex justify-center items-center border rounded-lg bg-white">
          <img
            src={defaultLogo}
            alt="league"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex border rounded-full bg-red-500">
          <div className="w-[60px] flex items-center justify-center text-white font-bold text-2xl">
            {scores?.Home}
          </div>
          <div className="bg-white w-[600px] p-2 flex font-bold text-blue-800 text-lg uppercase">
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

      <section className="w-[480px] mx-auto">
        <h1 className="text-xl font-bold text-center uppercase m-3">
          Match Statistics
        </h1>

        {fixType === "football" ? (
          <FootballStats data={data as SingleFixtureStats} />
        ) : fixType === "rugby7" ||
          fixType === "rugby15" ||
          fixType === "rugby10" ? (
          <RugbyStats data={data as SingleFixtureStats} />
        ) : (
          <div className="h-20 flex items-center justify-center text-xl">
            Data is coming soon!
          </div>
        )}
      </section>
    </main>
  );
};

export default SingleStream;

export const StatRow = ({
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
