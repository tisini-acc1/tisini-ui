import React from "react";
import { useQuery } from "@tanstack/react-query";

import FixtureCard from "./FixtureCard";
import { Fixture } from "@/lib/types/leagues";
import Spinner from "@/components/spinner/Spinner";
import { useLeague } from "@/context/LeagueContext";
import fetchSeasonFixtures from "@/lib/data/FetchLeagueFixtures";

const LeaguesPage = () => {
  const { league } = useLeague();

  const season = league.seasons[0].id;

  const { data, isLoading, isError, error } = useQuery(
    ["season-fixtures", season],
    () => fetchSeasonFixtures(season)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.log(error);
    return <div>Error</div>;
  }

  const matches = groupFixtures(data as Fixture[]);

  return (
    <>
      {data.length <= 0 && (
        <div className="h-96 bg-slate-300 flex justify-center items-center font-noto-serif text-2xl">
          No fixture data yet!
        </div>
      )}
      <main className="my-4 space-y-4">
        {Object.entries(matches).map(([round, fixtures], idx) => (
          <div className="border rounded-lg overflow-hidden" key={idx}>
            <div className="bg-primary/10 px-4 py-2 border-b">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <span className="font-bold text-primary">{round}</span>
              </h3>
            </div>

            <div className="divide-y  md:px-4 bg-gray-100">
              {fixtures.map((match) => (
                <FixtureCard key={match.fixture} fixture={match} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

const groupFixtures = (fixtures: Fixture[]) => {
  const grouped: { [round: string]: Fixture[] } = {};

  fixtures.forEach((fixture) => {
    const { matchday: round } = fixture;

    if (!grouped[round]) {
      grouped[round] = [];
    }

    grouped[round].push(fixture);
  });

  return grouped;
};

export default LeaguesPage;
