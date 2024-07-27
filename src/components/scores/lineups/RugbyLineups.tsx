import { useEffect, useState } from "react";

import { FixtureDetails, Lineup } from "@/lib/types/scores";
import AwayPlayer from "@/components/scores/lineups/AwayPlayer";
import HomePlayer from "@/components/scores/lineups/HomePlayer";

type LineUpsProps = {
  teams: FixtureDetails;
  squads: Lineup[];
};

const RugbyLineups = ({ teams, squads }: LineUpsProps) => {
  const [homePlayers, setHomePlayers] = useState<Lineup[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<Lineup[]>([]);

  useEffect(() => {
    const groupPlayersByTeam = (
      data: Lineup[],
      homeId: string,
      awayId: string
    ) => {
      const teamPlayer: { [key: string]: Lineup[] } = {};

      data.forEach((player) => {
        const key = player.teamId;

        if (!teamPlayer[key]) {
          teamPlayer[key] = [];
        }

        teamPlayer[key].push(player);
      });

      if (!teamPlayer[awayId]) {
        teamPlayer[awayId] = [];
      }
      if (!teamPlayer[homeId]) {
        teamPlayer[homeId] = [];
      }

      teamPlayer.home = teamPlayer[homeId];
      delete teamPlayer[homeId];
      teamPlayer.away = teamPlayer[awayId];
      delete teamPlayer[awayId];

      return teamPlayer;
    };

    const homeId = teams?.team1_id;
    const awayId = teams?.team2_id;

    const lineups = groupPlayersByTeam(squads, homeId, awayId);

    setHomePlayers(lineups["home"]);
    setAwayPlayers(lineups["away"]);
  }, [squads, teams]);

  return (
    // first 11
    <div className="flex flex-col space-y-2 p-2">
      {/* header */}
      <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
        {"Starting Players"}
      </div>

      {/* home players */}
      <div className="flex justify-between p-2">
        <div>
          {homePlayers.map((player) => (
            <div key={player.player_id}>
              {player.player_type === "first11" && (
                <HomePlayer name={player.pname} jersey={player.Jersey_No} />
              )}
            </div>
          ))}
        </div>

        {/* away players */}
        <div>
          {awayPlayers.map((player) => (
            <div key={player.player_id}>
              {player.player_type === "first11" && (
                <AwayPlayer name={player.pname} jersey={player.Jersey_No} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* subs section */}
      <div>
        <div className="flex justify-center items-center bg-gray-300 h-10 text-base md:text-2xl font-bold">
          {"Substitutes"}
        </div>

        <div className="flex justify-between p-2">
          <div>
            {homePlayers.map((player) => (
              <div key={player.player_id}>
                {player.player_type === "sub" && (
                  <HomePlayer name={player.pname} jersey={player.Jersey_No} />
                )}
              </div>
            ))}
          </div>
          <div>
            {awayPlayers.map((player) => (
              <div key={player.player_id}>
                {player.player_type === "sub" && (
                  <AwayPlayer name={player.pname} jersey={player.Jersey_No} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RugbyLineups;
