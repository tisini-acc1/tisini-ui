import { useState } from "react";

import homeImg from "@/assets/homeLogo.png";
import { useQuery } from "@tanstack/react-query";
import FetchStandings from "@/lib/data/FetchStandings";
// import { TableStandings } from "@/lib/types/scores";

export const Standings = () => {
  const [activeLeague, setActiveLeague] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const leagues = ["FKF PL", "FKF WPL", "Kenya Cup"];
  const tabs = ["Overal", "Top Scorers"];

  const { data } = useQuery(["standings"], FetchStandings);

  console.log(data);

  return (
    <div className="text-gray-500 w-full bg-slate-200">
      <div className="flex overflow-x-auto gap-1 bg-slate-100 p-1 rounded-md">
        {leagues.map((tab, idx) => (
          <button
            key={idx}
            className={`p-2 rounded-lg text-gray-700 text-base font-bold flex-grow w-80 hover:bg-gray-300 hover:bg-opacity-40 ${
              activeLeague === idx ? "bg-indigo-200" : ""
            }`}
            onClick={() => setActiveLeague(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex overflow-x-auto gap-1 bg-slate-200 mx-2 p-1">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`p-1 rounded-lg text-gray-700 text-base font-bold flex-grow w-80 hover:bg-gray-300 hover:bg-opacity-40 ${
              activeTab === idx ? "bg-indigo-200" : ""
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mx-2">
        <div className="grid grid-cols-12 px-2 bg-slate-200 p-1 text-xs font-semibold">
          <div className="col-span-6">
            <span className="mr-2">#</span>
            <span>Team</span>
          </div>
          <div className="col-span-1 text-center">MP</div>
          <div className="col-span-1 text-center">W</div>
          <div className="col-span-1 text-center">D</div>
          <div className="col-span-1 text-center">L</div>
          <div className="col-span-1 text-center">GD</div>
          <div className="col-span-1 text-center">PTS</div>
        </div>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
          (p) => (
            <StandingsRow key={p} />
          )
        )}

        <div className="p-2 pt-3 mb-1">
          <div>
            <span className="mr-1 bg-green-700 text-center text-bg-green-700 w-4 h-4 rounded-sm">
              01.
            </span>
            Promotion - CAF Champions league
          </div>

          <div>
            <span className="mr-1 bg-yellow-500 text-center w-4 h-4 rounded-sm">
              16.
            </span>
            Relegation - Play-offs
          </div>

          <div>
            <span className="mr-1 bg-red-500 text-center w-4 h-4 rounded-sm">
              17.
            </span>
            Relegation - National Super League
          </div>

          <div>
            If teams finish on equal points at the end of the season, score
            difference will be the tie-breaker.
          </div>
        </div>
      </div>
    </div>
  );
};

const StandingsRow = () => {
  return (
    <div className="grid grid-cols-12 px-2 border-b-2 p-1 bg-slate-100">
      <div className="col-span-6 flex">
        <span className="mr-1 bg-green-700 text-center text-white w-4 h-4 rounded-sm">
          1.
        </span>{" "}
        <img src={homeImg} alt="" className="w-4 h-4 mr-1" />{" "}
        <span>Githurai All Stars</span>
      </div>
      <div className="col-span-1 text-center">4</div>
      <div className="col-span-1 text-center">4</div>
      <div className="col-span-1 text-center">0</div>
      <div className="col-span-1 text-center">0</div>
      <div className="col-span-1 text-center">8</div>
      <div className="col-span-1 text-center">12</div>
    </div>
  );
};
