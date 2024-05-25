import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import Dates from "./Dates";
import SingleResult from "./SingleResult";
import Spinner from "@/components/spinner/Spinner";
import { Fixture, FixturesArray } from "@/lib/types/scores";
import GroupBallFixtures from "../../lib/scores/GroupBallFixtures";
import fetchFootballFixtures from "../../lib/scores/FetchFootballFixtures";

const Football = () => {
  const { data, isLoading } = useQuery<Fixture[], Error>(
    ["footballFixtures"],
    fetchFootballFixtures
  );

  const ballFixtures = useMemo(() => {
    if (!data) return [];

    const fixtures = GroupBallFixtures(data);

    return data ? Object.entries(fixtures) : [];
  }, [data]);

  const ballDates = useMemo(() => {
    if (!data) return [];

    const fixtures = GroupBallFixtures(data);
    return data ? Object.keys(fixtures) : [];
  }, [data]);

  const [fixtures, setFixtures] = useState<FixturesArray[]>([]);
  const [filterDate, setFilterDate] = useState(ballDates[0]);

  const dates = ballDates.slice(0, 7).reverse();

  useEffect(() => {
    setFilterDate(ballDates[0]);
  }, [ballDates]);

  useEffect(() => {
    const fetchDayFixtures = () => {
      const date = filterDate;
      ballFixtures.forEach((day) => {
        if (day[0] === date) {
          setFixtures(Object.entries(day[1]));
        }
      });
    };

    fetchDayFixtures();
  }, [filterDate, ballFixtures]);

  if (isLoading) return <Spinner />;

  // if (isError) return <h2>{error.message}</h2>;
  console.log(fixtures);

  return (
    <div className="flex ">
      <div className="w-full ">
        <div className="flex justify-evenly bg-black-lighter ">
          {dates.map((date, key) => (
            <div key={key}>
              <Dates
                date={date}
                onClick={(date) => setFilterDate(date)}
                isSelected={date === filterDate}
              />
            </div>
          ))}
        </div>

        {fixtures.map((league, key) => (
          <div key={key} className="shadow-lg mb-4 p-2">
            <div className="flex bg-black p-2">
              <div className="font-semibold text-sm">
                <div className="">Kenya: {league[0]}</div>
              </div>
            </div>

            {league[1].map((fixtures, key) => (
              <div key={key}>
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
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Football;
