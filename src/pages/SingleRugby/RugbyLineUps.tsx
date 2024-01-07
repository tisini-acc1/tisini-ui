import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";

import { tokens } from "@/theme/ScoresTheme";
import { FixtureDetails, Lineup } from "@/lib/types/scores";
import AwayPlayer from "@/components/scores/lineups/AwayPlayer";
import HomePlayer from "@/components/scores/lineups/HomePlayer";
import LineupsTitle from "@/components/scores/lineups/LineupsTitle";

type LineUpsProps = {
  teams: [FixtureDetails];
  squads: Lineup[];
};

const LineUps = ({ teams, squads }: LineUpsProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  return (
    <Box bgcolor={colors.primary[300]}>
      {/* first 11 section */}
      <Box mb={2}>
        <LineupsTitle title={"Starting players"} />
        <Box
          display="flex"
          justifyContent="space-between"
          p={0.5}
          mb={0.5}
          bgcolor={colors.primary[400]}
        >
          <Box>
            {homePlayers.map((player) => (
              <Box key={player.player_id}>
                {player.player_type === "first11" && (
                  <Box>
                    <HomePlayer name={player.pname} jersey={player.Jersey_No} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
          <Box>
            {awayPlayers.map((player) => (
              <Box key={player.player_id}>
                {player.player_type === "first11" && (
                  <Box>
                    <AwayPlayer name={player.pname} jersey={player.Jersey_No} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* subs section */}
        <Box>
          <LineupsTitle title={"Substitutes"} />
          <Box
            display="flex"
            justifyContent="space-between"
            p={0.5}
            mb={0.5}
            bgcolor={colors.primary[400]}
          >
            <Box>
              {homePlayers.map((player) => (
                <Box key={player.player_id}>
                  {player.player_type === "sub" && (
                    <Box>
                      <HomePlayer
                        name={player.pname}
                        jersey={player.Jersey_No}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
            <Box>
              {awayPlayers.map((player) => (
                <Box key={player.player_id}>
                  {player.player_type === "sub" && (
                    <Box>
                      <AwayPlayer
                        name={player.pname}
                        jersey={player.Jersey_No}
                      />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LineUps;
