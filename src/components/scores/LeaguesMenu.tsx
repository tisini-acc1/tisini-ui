import React from "react";
import { useNavigate } from "react-router-dom";

const LeaguesMenu = () => {
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

export type SeriesMenu = { serie: string; id: string };
export type SeasonMenu = { id: string; season: string; series: SeriesMenu[] };
export type LeagueMenu = {
  id: string;
  name: string;
  series: boolean;
  seasons: SeasonMenu[];
};
export type LeagueData = {
  [sport: string]: LeagueMenu[];
};

export const leagues: LeagueData = {
  rugby: [
    {
      id: "238",
      name: "Sportpesa 7s",
      series: true,
      seasons: [
        {
          id: "",
          season: "2025",
          series: [
            { serie: "Dala 7s", id: "122" },
            { serie: "Kabeberi 7s", id: "121" },
            { serie: "Embu 7s", id: "117" },
            { serie: "Christie 7s", id: "111" },
            { serie: "Prinsloo 7s", id: "104" },
            { serie: "Driftwood 7s", id: "103" },
          ],
        },
      ],
    },
    {
      id: "246",
      name: "Kenya u18 Trials",
      series: false,
      seasons: [{ id: "118", season: "2025", series: [] }],
    },
  ],
  football: [
    {
      id: "205",
      name: "FKF Premier League",
      series: false,
      seasons: [{ id: "123", season: "25/26", series: [] }],
    },
  ],
  //   basketball: [],
};
