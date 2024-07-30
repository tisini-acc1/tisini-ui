import { useQuery } from "@tanstack/react-query";

import { Fixture } from "@/lib/types/scores";
import MainHeader from "@/components/MainHeader";
import Spinner from "@/components/spinner/Spinner";
import FetchRugbyFixtures from "@/lib/scores/FetchRugbyFixtures";
import { useEffect, useState } from "react";
import StreamFixture from "./StreamFixture";
import MainFooter from "@/components/MainFooter";

const Stream = () => {
  const { isLoading, data } = useQuery<Fixture[], Error>(
    ["rugbyFixtures"],
    FetchRugbyFixtures
  );

  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    if (data) {
      setFixtures(data.slice(0, 6));
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <main>
      <MainHeader />

      <section>
        {fixtures!.map((fixture) => (
          <div key={fixture.id}>
            <StreamFixture fixture={fixture} />
          </div>
        ))}
      </section>

      <MainFooter />
    </main>
  );
};

export default Stream;
