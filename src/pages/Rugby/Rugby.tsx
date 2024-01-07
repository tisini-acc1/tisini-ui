import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

import Dates from "../Football/Dates";
import { tokens } from "@/theme/ScoresTheme";
import SingleResult from "../Football/SingleResult";
import FetchRugbyFixtures from "@/lib/scores/FetchRugbyFixtures";
import GroupRubgyFixtures from "@/lib/scores/GroupRugbyFixtures";
import { Fixture, FixturesArray } from "@/lib/types/scores";

const Rugby = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures"],
    FetchRugbyFixtures
  );

  const rugbyFixtures = useMemo(() => {
    if (!data) return {};

    const fixtures = GroupRubgyFixtures(data);
    return data ? fixtures : {};
  }, [data]);

  const rugbyDates = useMemo(() => {
    if (!data) return [];

    const fixtures = GroupRubgyFixtures(data);
    return data ? Object.keys(fixtures) : [];
  }, [data]);

  const [fixtures, setFixtures] = useState<FixturesArray[]>([]);
  const [filterDate, setFilterDate] = useState(rugbyDates[0]);

  const dates = rugbyDates.slice(0, 7).reverse();

  useEffect(() => {
    setFilterDate(rugbyDates[0]);
  }, [rugbyDates]);

  useEffect(() => {
    const fetchDayFixtures = () => {
      if (filterDate) {
        if (rugbyFixtures[filterDate]) {
          setFixtures(Object.entries(rugbyFixtures[filterDate]));
        }
      }
    };

    fetchDayFixtures();
  }, [rugbyFixtures, filterDate]);

  // useEffect(() => {
  //   const newData = {};

  //   for (const date in allFixtures) {
  //     const events = allFixtures[date];
  //     for (const eventName in events) {
  //       const eventData = events[eventName];
  //       if (!newData[date]) {
  //         newData[date] = {};
  //       }
  //       if (!newData[date][eventName]) {
  //         newData[date][eventName] = {};
  //       }
  //       eventData.forEach((item) => {
  //         const matchday = item.matchday;
  //         if (!newData[date][eventName][matchday]) {
  //           newData[date][eventName][matchday] = [];
  //         }
  //         newData[date][eventName][matchday].push(item);
  //       });
  //     }
  //   }

  //   const fetchDayFixtures = () => {
  //     if (newData[filterDate]) {
  //       setFixtures(Object.entries(newData[filterDate]));
  //     }
  //   };

  //   fetchDayFixtures();
  // }, [allFixtures, filterDate, dates]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box display="flex" flexDirection="row" width="100%" p={0.5} pt={0}>
      {!isSmallScreen && (
        <Box
          mr={0.5}
          width={`${100 - 85}%`}
          border="1px solid black"
          bgcolor={colors.primary[400]}
        >
          Kenya
        </Box>
      )}

      <Box width="100%" mt={0.5}>
        <Box
          m={0.3}
          display="flex"
          justifyContent="space-evenly"
          bgcolor={colors.primary[900]}
        >
          {dates.map((date, key) => (
            <Box key={key}>
              <Dates
                date={date}
                onClick={(date) => setFilterDate(date)}
                isSelected={date === filterDate}
              />
            </Box>
          ))}
        </Box>

        {fixtures.map((league, key) => (
          <Box mb={2} key={key}>
            <Box display="flex" bgcolor={colors.primary[600]} mb={0.2} p={0.7}>
              <Box display="flex" color={colors.gray[100]} gap={0.5}>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  Kenya:
                </Typography>
                <Typography variant="h6" fontSize="small" fontWeight="bold">
                  {league[0]} - {league[1][0].series}
                </Typography>
              </Box>
            </Box>

            {/* loop through every matchday */}
            {league[1].map((fixtures, key) => (
              <Box key={key}>
                <SingleResult
                  homeTeam={fixtures.team1_name}
                  awayTeam={fixtures.team2_name}
                  homeScore={fixtures.home_score}
                  awayScore={fixtures.away_score}
                  fixtureId={fixtures.id}
                  fixtureType={fixtures.fixture_type}
                  fixtureState={fixtures.game_status}
                  minute={fixtures.minute}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Rugby;
