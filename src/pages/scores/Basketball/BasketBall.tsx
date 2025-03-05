import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import Dates from "../Football/Dates";
import FixtureLoader from "../FixtureLoader";
import SingleResult from "../Football/SingleResult";
import { Fixture, FixturesArray } from "@/lib/types/scores";
import GroupBallFixtures from "@/lib/data/GroupBallFixtures";
import fetchBasketBallFixtures from "@/lib/data/FetchBasketFixtures";

const BasketBall = () => {
  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures"],
    fetchBasketBallFixtures
  );

  const basketballFixs = useMemo(() => {
    if (!data) return {};

    const fixtures = GroupBallFixtures(data);
    return data ? fixtures : {};
  }, [data]);

  const [dates, setDates] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<string>(dates[dates.length - 1]);
  const [fixtures, setFixtures] = useState<FixturesArray[]>([]);

  useEffect(() => {
    const dates = Object.keys(basketballFixs).slice(0, 7).reverse();
    setDates(dates);

    // Set default filterDate if it's not already set
    if (!filterDate && dates.length > 0) {
      setFilterDate(dates[dates.length - 1]);
    }

    // Update fixtures based on filterDate
    if (filterDate && basketballFixs[filterDate]) {
      setFixtures(Object.entries(basketballFixs[filterDate]));
    }
  }, [basketballFixs, filterDate]);

  if (isLoading) return <FixtureLoader />;

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
            <div className="flex bg-black p-2">
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

export default BasketBall;
