import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FixtureStats from "./FixtureStats";
import FixtureHeader from "./FixtureHeader";
import FixtureLineups from "./FixtureLineups";
import FixStatsLoader from "../FixStatsLoader";
import FixtureOverview from "./FixtureOverview";
import FetchFixtureById from "@/lib/data/FetchFixtureById";
import {
  Cards,
  FixtureDetails,
  Fouls,
  GameHighlights,
  H2H,
  Lineup,
  Scores,
  SingleFixtureStats,
  Stats,
} from "@/lib/types/scores";
import FetchFixtureH2H from "@/lib/data/FetchFixtureH2H";
import { FixtureH2H } from "./FixtureH2H";

const SingleFixture = () => {
  const { fixtureId } = useParams();
  const [activeTab, setActiveTab] = useState(1);

  const [compId, seasonId, fixId] = fixtureId?.split("-") || [];

  const { data, isLoading } = useQuery<SingleFixtureStats, Error>(
    ["footballById", fixtureId],
    () => FetchFixtureById(fixId!),
  );

  const { data: h2h, isLoading: h2hLoading } = useQuery(
    ["head2head", fixtureId],
    () => FetchFixtureH2H(compId, seasonId, fixId),
  );

  console.log(h2hLoading);

  const tabs = ["Details", "Stats", "Line ups", "H2H"];

  const details = data?.fixture[0];
  const home = data?.home;
  const away = data?.away;
  const scores = data?.scores;
  const lineups = data?.players;
  const cards = data?.cards;
  const fouls = data?.fouls;
  const highlights = data?.gamedetails;

  const fixType = details?.fixture_type;

  const tabContents = [
    <FixtureOverview
      teams={details as FixtureDetails}
      highlights={highlights as GameHighlights[]}
    />,
    <FixtureStats
      home={home as Stats}
      away={away as Stats}
      cards={cards as Cards}
      fouls={fouls as Fouls}
      fixType={fixType as string}
    />,
    <FixtureLineups
      teams={details as FixtureDetails}
      squads={lineups as Lineup[]}
      fixType={fixType as string}
    />,
    <FixtureH2H data={h2h as H2H} />,
  ];

  if (isLoading) {
    return <FixStatsLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-2 border-2 border-indigo-200 text-gray-500">
      <FixtureHeader
        teamDetails={details as FixtureDetails}
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
};

export default SingleFixture;
