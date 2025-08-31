import React from "react";
import { useNavigate } from "react-router-dom";

import { useLeague } from "@/context/LeagueContext";

const LeaguesMenu = () => {
  const { setLeague } = useLeague();
  const navigate = useNavigate();

  return (
    <section className="">
      <div className="bg-black-lighter rounded-sm p-2">
        <h3 className="font-bold">Leagues</h3>
      </div>

      <div className="mt-2">
        {Object.entries(leagues).map(([key, sports]) => {
          return (
            <div key={key} className="">
              <div className="font-bold p-2 capitalize text-black-lighter bg-gray-200">
                {key}
              </div>

              {sports.map((value) => {
                const url = value.name.split(" ").join("-").toLowerCase();

                return (
                  <div
                    key={value.id}
                    className="text-primary font-semibold bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer m-2 rounded-md"
                    onClick={() => {
                      navigate(`/scores/leagues/${key}-${url}-${value.id}`);
                      setLeague(value);
                    }}
                  >
                    {value.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LeaguesMenu;

type Season = { id: string; season: string; series: string[] };
type League = {
  id: string;
  name: string;
  series: boolean;
  seasons: Season[];
};

type LeagueMenu = {
  [sport: string]: League[];
};

export const leagues: LeagueMenu = {
  rugby: [
    // {
    //   id: "1",
    //   name: "Sportpesa 7s",
    //   series: true,
    //   seasons: [{ id: "", season: "2025", series: [] }],
    // },
    {
      id: "246",
      name: "Kenya u18 Trials",
      series: false,
      seasons: [{ id: "118", season: "2025", series: [] }],
    },
  ],
  //   football: [],
  //   basketball: [],
};
