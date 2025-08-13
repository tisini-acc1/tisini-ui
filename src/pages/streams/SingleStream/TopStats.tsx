import React from "react";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import tisiniLogo from "@/assets/img/tisini-logo.png";
import fetchSeasonScorers from "@/lib/data/FetchLeagueScorers";

const TopStats = () => {
  const { data, isLoading } = useQuery(
    ["rugbyScorers"],
    () => fetchSeasonScorers("104"),
    { refetchInterval: 10000, refetchOnWindowFocus: true }
  );

  if (isLoading) return <Spinner />;

  const topScorers = data?.sort(
    (a, b) => parseInt(b.totalpoints) - parseInt(a.totalpoints)
  );

  return (
    <main className="p-10 relative h-screen">
      <section className="absolute bottom-24 left-20 mb-1">
        <div className="bg-blue-800 p-2 border border-black text-white flex gap-2 items-center ">
          <img src={tisiniLogo} alt="tisini" className="w-13 h-7" />

          <h4 className="font-bold capitalize">Top point scorers</h4>
        </div>

        {topScorers?.slice(0, 5).map((player, idx) => (
          <div
            key={player.playerid}
            className="grid grid-cols-12 border-b-2 border-black bg-gray-100 font-semibold text-xs p-1"
          >
            <div className="col-span-1">{idx + 1}</div>
            <div className="col-span-9 capitalize">{player.playername}</div>
            <div className="col-span-2 text-end">{player.totalpoints}</div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default TopStats;
