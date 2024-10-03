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
      : streamName === "varsity"
      ? "Varsity Cup"
      : streamName === "legends"
      ? "Legends Cup"
      : "Sportpesa National 7s circuit";

  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    if (data) {
      const fixs = data.filter(
        (fix) =>
          fix.league === league &&
          (fix.game_date === "2024-09-28" || fix.game_date === "2024-09-29")
      );

      setFixtures(fixs);
      // setFixtures(data);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <main>
      <MainHeader />

      <section className="max-w-5xl mx-auto">
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
