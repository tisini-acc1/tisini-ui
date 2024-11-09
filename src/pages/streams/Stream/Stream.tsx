import { useQuery } from "@tanstack/react-query";

import { Fixture } from "@/lib/types/scores";
import MainHeader from "@/components/MainHeader";
import Spinner from "@/components/spinner/Spinner";
import FetchRugbyFixtures from "@/lib/data/FetchRugbyFixtures";
import { useEffect, useState } from "react";
import StreamFixture from "./StreamFixture";
import MainFooter from "@/components/MainFooter";
import { useParams } from "react-router-dom";

const Stream = () => {
  const { streamName } = useParams();

  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures"],
    FetchRugbyFixtures,
    { refetchInterval: 10000 }
  );

  const league =
    streamName === "kawowo"
      ? "Nile Special 7s"
      : streamName === "elgon"
      ? "Elgon Cup"
      : streamName === "legends"
      ? "Legends Cup"
      : "2024 Impala Floodlit";

  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    if (streamName === "live") {
      const fix = (data?.slice(0, 30) || []) as Fixture[];
      setFixtures(fix);
    } else if (data && league) {
      const filteredFixtures = data.filter(
        (fix) =>
          fix.league === league &&
          ["2024-11-09", "2024-11-10", "2024-11-16", "2024-11-17"].includes(
            fix.game_date
          )
      );

      setFixtures(filteredFixtures);
    }
  }, [data, league, streamName]);

  // console.log(fixtures);
  // console.log(data);

  if (isLoading) return <Spinner />;

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
