import Spinner from "@/components/spinner/Spinner";
import fetchSeasonFixtures from "@/lib/data/FetchLeagueFixtures";
import { Fixture } from "@/lib/types/leagues";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FixtureCard from "./FixtureCard";

const LeaguesPage = () => {
  const { data, isLoading, isError } = useQuery(
    ["season-fixtures"],
    fetchSeasonFixtures
  );

  const matches = groupFixtures(data as Fixture[]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
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
