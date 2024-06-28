import { useEffect, useState } from "react";

import shirt from "@/assets/img/t-shirt.png";
import { FixtureDetails, Lineup } from "@/lib/types/scores";
import HomePlayer from "@/components/scores/lineups/HomePlayer";
import AwayPlayer from "@/components/scores/lineups/AwayPlayer";

type LineupsProps = {
  teams: [FixtureDetails];
  squads: Lineup[];
};

const FootballLineups = ({ teams, squads }: LineupsProps) => {
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

    const homeId = teams[0].team1_id;
    const awayId = teams[0].team2_id;

    const lineups = groupPlayersByTeam(squads, homeId, awayId);

    setHomePlayers(lineups["home"]);
    setAwayPlayers(lineups["away"]);
  }, [squads, teams]);

  // console.log(homePlayers[0].lineupposition);
  // console.log(awayPlayers);

  return (
    <div className="flex flex-col space-y-2 p-2">
      {(homePlayers.length > 1 || awayPlayers.length > 1) && (
        <div className="flex flex-col md:flex-row ">
          <div className="bg-homeSm md:bg-homeLg md:w-1/2 h-[400px] bg-cover bg-no-repeat bg-center flex flex-col md:flex-row md:items-center md:space-x-4 gap-2 md:gap-4">
            {homePlayers.length > 1 ? (
              <>
                <div className="flex items-center justify-center mt-6 md:ml-10">
                  <PlayerTile player={homePlayers[0]} />
                </div>
                <div className="flex md:flex-col justify-evenly">
                  <PlayerTile player={homePlayers[1]} />
                  <PlayerTile player={homePlayers[2]} />
                  <PlayerTile player={homePlayers[3]} />
                  <PlayerTile player={homePlayers[4]} />
                </div>

                <div className="flex md:flex-col justify-evenly md:space-y-2">
                  <PlayerTile player={homePlayers[6]} />
                  <PlayerTile player={homePlayers[7]} />
                </div>

                <div className="flex md:flex-col justify-evenly md:space-y-6">
                  <PlayerTile player={homePlayers[6]} />
                  <div></div>
                  <PlayerTile player={homePlayers[9]} />
                  <div></div>
                  <PlayerTile player={homePlayers[7]} />
                </div>

                <div className="flex md:flex-col justify-evenly">
                  <PlayerTile player={homePlayers[10]} />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                Oops! No Data
              </div>
            )}
          </div>

          {/* away players */}
          <div className="bg-awaySm md:bg-awayLg md:w-1/2 h-[400px] bg-cover bg-no-repeat bg-center flex flex-col md:flex-row justify-end md:items-center md:space-x-8 gap-2 md:gap-4 md:pr-4">
            {awayPlayers.length > 1 ? (
              <>
                <div className="flex md:flex-col justify-evenly">
                  <PlayerTile player={awayPlayers[10]} />
                </div>

                <div className="flex md:flex-col justify-evenly md:space-y-6">
                  <PlayerTile player={awayPlayers[8]} />
                  <div></div>
                  <PlayerTile player={awayPlayers[9]} />
                  <div></div>
                  <PlayerTile player={awayPlayers[5]} />
                </div>

                <div className="flex md:flex-col justify-evenly md:space-y-2">
                  <PlayerTile player={awayPlayers[7]} />

                  <PlayerTile player={awayPlayers[6]} />
                </div>

                <div className="flex md:flex-col justify-evenly">
                  <PlayerTile player={awayPlayers[4]} />
                  <PlayerTile player={awayPlayers[3]} />
                  <PlayerTile player={awayPlayers[2]} />
                  <PlayerTile player={awayPlayers[1]} />
                </div>

                <div className="flex items-center justify-center ">
                  <PlayerTile player={awayPlayers[0]} />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                Oops! No Data
              </div>
            )}
          </div>
        </div>
      )}

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

export default FootballLineups;

export const PlayerTile = ({ player }: { player: Lineup }) => {
  const name = player?.pname ? player.pname.split(" ") : [];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img src={shirt} alt="" className="w-8 md:w-12 h-8 md:h-12 mb-1" />
        <div className="absolute inset-0 flex items-center justify-center font-bold">
          {player?.Jersey_No}
        </div>
      </div>
      <p className="font-bold whitespace-nowrap text-xs text-ellipsis">
        {name.length > 1 ? `${name[0][0]}. ${name[1]}` : ""}
      </p>
    </div>
  );
};
