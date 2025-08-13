import React from "react";
import tisiniLogo from "@/assets/img/tisini-logo.png";
import sportpesa7s from "@/assets/tournaments/Sportpesa7s.png";

const MatchInsights = () => {
  return (
    <main className="p-10 relative h-screen">
      <section className="absolute bottom-24 left-20 mb-1">
        <div className="bg-blue-800 p-2 border border-black text-white flex gap-2 items-center ">
          <img src={tisiniLogo} alt="tisini" className="w-13 h-7" />

          <h4 className="font-bold">Match Insights</h4>
        </div>

        <div className="w-60 grid grid-cols-9 gap-2 text-xs text-center font-semibold bg-slate-300">
          <div className="col-span-3 p-1">Team A</div>
          <div className="col-span-3 p-1 flex items-center pl-4">
            <img src={sportpesa7s} alt="Sportpesa7s" className="h-5" />
          </div>
          <div className="col-span-3 p-1">Team B</div>
        </div>

        <RowStat home={"23"} stat={"passes"} away={"23"} />

        <RowStat home={"16"} stat={"carries"} away={"14"} />

        <RowStat home={"1"} stat={"visit into opp 22"} away={"2"} />

        <RowStat home={"0"} stat={"line breaks"} away={"3"} />

        <RowStat home={"2"} stat={"offloads"} away={"3"} />
      </section>
    </main>
  );
};

const RowStat = ({
  home,
  away,
  stat,
}: {
  home: string;
  away: string;
  stat: string;
}) => {
  return (
    <div className="w-60 grid grid-cols-8 text-xs text-center text-white font-semibold bg-slate-300 border-b-2 border-black">
      <div className="col-span-2 p-1 bg-blue-800 ">{home}</div>
      <div className="bg-red-600 col-span-4 capitalize p-1">{stat}</div>
      <div className="col-span-2 p-1 bg-blue-800 ">{away}</div>
    </div>
  );
};

export default MatchInsights;
