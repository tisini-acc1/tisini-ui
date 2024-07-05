import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FootballStats from "../../components/scores/stats/FootballStats";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";
import {
  Cards,
  FixtureDetails,
  Fouls,
  Lineup,
  Scores,
  SingleFixtureStats,
  Stats,
} from "@/lib/types/scores";
import Spinner from "@/components/spinner/Spinner";
import FixtureHeader from "./FixtureHeader";
import FootballLineups from "@/components/scores/lineups/FootballLineups";
import FixtureOverview from "./FixtureOverview";

export default function SingleFootball() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = ["Details", "Stats", "Line ups"];

  const { fixtureId } = useParams();

  const { data, isLoading } = useQuery<SingleFixtureStats, Error>(
    ["footballById"],
    () => FetchFixtureById(fixtureId!)
  );
  // console.log(data);
  const details = data?.[0];
  const home = data?.[1];
  const away = data?.[2];
  const scores = data?.[3];
  const lineups = data?.[4];
  const cards = data?.[5];
  const fouls = data?.[6];

  const tabContents = [
    <FixtureOverview />,
    <FootballStats
      home={home as Stats[]}
      away={away as Stats[]}
      cards={cards as Cards}
      fouls={fouls as Fouls}
    />,
    <FootballLineups
      teams={details as [FixtureDetails]}
      squads={lineups as Lineup[]}
    />,
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-2 border-2 border-indigo-200 text-gray-500">
      <FixtureHeader
        teamDetails={details as [FixtureDetails]}
        scores={scores as Scores}
      />
      <div className="flex overflow-x-auto gap-1 bg-white p-1 rounded-md">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`p-2 md:p-4 rounded-lg text-gray-700 text-base font-bold flex-grow w-80 hover:bg-gray-300 hover:bg-opacity-40 ${
              activeTab === idx ? "bg-indigo-200" : ""
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-2 text-gray-700 bg-white rounded-md">
        {tabContents[activeTab]}
      </div>
    </div>
  );
}
