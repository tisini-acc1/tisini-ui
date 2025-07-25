import React from "react";

const LeaguesPage = () => {
  return (
    <main className="my-4 space-y-4">
      {/* {Object.entries(matches).map(([round, fixtures], idx) => (
        <div className="border rounded-lg overflow-hidden" key={idx}>
     
          <div className="bg-secondary/30 px-4 py-2 border-b">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <span className="font-bold text-primary">{round}</span>
              
            </h3>
          </div>

        
          <div className="divide-y  md:px-4">
            {fixtures.map((match) => (
              <FixtureCard key={match.fixture} fixture={match} />
            ))}
          </div>
        </div>
      ))} */}
      Leagues
    </main>
  );
};

// const groupFixtures = (fixtures: Fixture[]) => {
//   const grouped: { [round: string]: Fixture[] } = {};

//   fixtures.forEach((fixture) => {
//     const { matchday: round } = fixture;

//     if (!grouped[round]) {
//       grouped[round] = [];
//     }

//     grouped[round].push(fixture);
//   });

//   return grouped;
// };

export default LeaguesPage;
