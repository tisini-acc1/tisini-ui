import { useQuery } from "@tanstack/react-query";

import { Fixture } from "@/lib/types/scores";
import MainHeader from "@/components/MainHeader";
import Spinner from "@/components/spinner/Spinner";
import { useEffect, useMemo, useState } from "react";
import StreamFixture from "./StreamFixture";
import MainFooter from "@/components/MainFooter";
import { useParams } from "react-router-dom";
import {
  FetchRugby10,
  FetchRugby15,
  FetchRugby7,
} from "@/lib/data/FetchRugbyFixtures";

const Stream = () => {
  const { streamName } = useParams();

  // const { isLoading, data } = useQuery<Fixture[], Error>(
  //   ["rugbyFixtures"],
  //   FetchRugbyFixtures,
  //   { refetchInterval: 10000 }
  // );

  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures7"],
    FetchRugby7,
    { refetchInterval: 10000 }
  );

  const { data: rugby10, isLoading: tenLoading } = useQuery<Fixture[], Error>(
    ["rugbyFixtures10"],
    FetchRugby10,
    { refetchInterval: 10000 }
  );

  const { data: rugby15, isLoading: fifteenLoading } = useQuery<
    Fixture[],
    Error
  >(["rugbyFixtures15"], FetchRugby15, { refetchInterval: 10000 });

  const rugbyFixs = useMemo(
    () =>
      [
        ...(data?.slice(0, 100) || []),
        ...(rugby10?.slice(0, 100) || []),
        ...(rugby15?.slice(0, 100) || []),
      ].sort((a, b) => Number(b.id) - Number(a.id)),
    [data, rugby10, rugby15]
  );

  const league =
    streamName === "kawowo"
      ? "Nile Special 7s"
      : streamName === "elgon"
      ? "Elgon Cup"
      : streamName === "legends"
      ? "Legends Cup"
      : "Eric Shirley Shield";

  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    if (streamName === "live") {
      const fix = (rugbyFixs?.slice(0, 30) || []) as Fixture[];
      setFixtures(fix);
    } else if (rugbyFixs && league) {
      const filteredFixtures = rugbyFixs.filter(
        (fix) =>
          fix.league === league &&
          ["2024-11-09", "2025-03-22", "2025-03-16", "2025-04-05"].includes(
            fix.game_date
          )
      );

      setFixtures(filteredFixtures);
    }
  }, [rugbyFixs, league, streamName]);

  // console.log(fixtures);
  // console.log(data);

  if (isLoading || tenLoading || fifteenLoading) return <Spinner />;

  return (
    <main>
      <MainHeader />

      <section className="max-w-5xl mx-auto min-h-screen">
        {fixtures.length === 0 ? (
          <div className="h-screen flex items-center justify-center text-3xl">
            No data!
          </div>
        ) : (
          fixtures!.map((fixture) => (
            <div key={fixture.id}>
              <StreamFixture fixture={fixture} />
            </div>
          ))
        )}
      </section>

      <MainFooter />
    </main>
  );
};

export default Stream;
