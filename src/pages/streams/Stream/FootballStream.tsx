import MainHeader from "@/components/MainHeader";
import Spinner from "@/components/spinner/Spinner";
import fetchFootballFixtures from "@/lib/data/FetchFootballFixtures";
import { Fixture } from "@/lib/types/scores";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StreamFixture from "./StreamFixture";
import MainFooter from "@/components/MainFooter";

const FootballStream = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  const { streamName } = useParams();

  // console.log(streamName);

  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures"],
    fetchFootballFixtures,
    { refetchInterval: 10000 }
  );

  const league =
    streamName === "tawi-tv" ? "Nile Special 7s" : "Eric Shirley Shield";

  useEffect(() => {
    if (streamName === "live") {
      const fix = (data?.slice(0, 30) || []) as Fixture[];
      setFixtures(fix);
    } else if (data && league) {
      const filteredFixtures = data.filter(
        (fix) =>
          fix.league === league &&
          ["2024-11-09", "2025-03-22", "2025-03-16", "2025-04-05"].includes(
            fix.game_date
          )
      );

      setFixtures(filteredFixtures);
    }
  }, [data, league, streamName]);

  if (isLoading) return <Spinner />;

  return (
    <main>
      <MainHeader />

      <section className="max-w-5xl mx-auto min-h-screen">
        {fixtures?.length === 0 ? (
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

export default FootballStream;
