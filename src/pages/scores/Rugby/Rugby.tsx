import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import Dates from "../Football/Dates";
import FixtureLoader from "../FixtureLoader";
import SingleResult from "../Football/SingleResult";
import GroupFixtures from "@/lib/data/GroupRugbyFixtures";
import { Fixture, FixturesArray } from "@/lib/types/scores";
import {
  FetchRugby10,
  FetchRugby15,
  FetchRugby7,
} from "@/lib/data/FetchRugbyFixtures";
import { useNavigate } from "react-router-dom";

const Rugby = () => {
  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures7"],
    FetchRugby7
  );

  const { data: rugby10, isLoading: tenLoading } = useQuery<Fixture[], Error>(
    ["rugbyFixtures10"],
    FetchRugby10
  );

  const { data: rugby15, isLoading: fifteenLoading } = useQuery<
    Fixture[],
    Error
  >(["rugbyFixtures15"], FetchRugby15);

  const rugbyFixs = useMemo(
    () =>
      [
        ...(data?.slice(0, 100) || []),
        ...(rugby10?.slice(0, 100) || []),
        ...(rugby15?.slice(0, 100) || []),
      ].sort((a, b) => Number(b.id) - Number(a.id)),
    [data, rugby10, rugby15]
  ); // Only recomputes when dependencies change

  const rugbyFixtures = useMemo(() => {
    if (!rugbyFixs) return {};

    const fixtures = GroupFixtures(rugbyFixs);
    return rugbyFixs ? fixtures : {};
  }, [rugbyFixs]);

  const [dates, setDates] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [fixtures, setFixtures] = useState<FixturesArray[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const newDates = Object.keys(rugbyFixtures).slice(0, 7).reverse();
    setDates(newDates);

    if (newDates.length > 0) {
      setFilterDate(newDates[newDates.length - 1]);
    }
  }, [rugbyFixtures]);

  useEffect(() => {
    if (filterDate && rugbyFixtures[filterDate]) {
      setFixtures(Object.entries(rugbyFixtures[filterDate]));
    }
  }, [filterDate, rugbyFixtures]);

  if (isLoading || tenLoading || fifteenLoading) return <FixtureLoader />;

  return (
    <div className="flex ">
      <div className="w-full ">
        <div className="flex justify-evenly bg-black-lighter">
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
          <div className="shadow-lg mb-4 p-2" key={key}>
            <div
              className="flex bg-black p-2"
              onClick={() => navigate(`/scores/leagues/sportpesa-7s`)}
            >
              <div className="font-semibold text-sm">
                <div className="">Kenya: {league[0]}</div>
              </div>
            </div>

            {league[1].map((fixture) => (
              <div key={fixture.id}>
                <SingleResult fixture={fixture} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rugby;
