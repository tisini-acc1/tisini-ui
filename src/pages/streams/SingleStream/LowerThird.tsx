import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

// import kawowo from "@/assets/img/kawowo.jpg";
import tisini from "@/assets/img/tisini-logo.png";
// import league from "@/assets/img/nile-special.png";
import { getStat, getSubEvent } from "@/lib/scores/calculations";

interface Stat {
  stat: string;
  home: string | number;
  away: string | number;
}

type StatsArray = Stat[];

export const LowerThird = () => {
  const { fixtureId } = useParams();

  const { data, isLoading, refetch } = useQuery<SingleFixtureStats, Error>(
    ["footballById"],
    () => FetchFixtureById(fixtureId!),
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    }
  );

  const [currentStats, setCurrentStats] = useState<StatsArray>([
    { stat: "Tries", home: "-", away: "-" },
  ]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (data?.fixture[0].game_status === "ended") {
      refetch({ cancelRefetch: true });
    }
  }, [data, refetch]);

  const stats = useMemo(() => {
    if (!data?.home || !data?.away) return [];

    const home = data.home as Stats;
    const away = data.away as Stats;
    const cards = data.cards;

    const hLineoutsWon =
      getSubEvent(home, "Lineout throw", "Front won") +
      getSubEvent(home, "Lineout throw", "Middle won") +
      getSubEvent(home, "Lineout throw", "Back won") +
      getSubEvent(home, "Lineout throw", "Overthrow Won");
    const aLineoutsWon =
      getSubEvent(away, "Lineout throw", "Front won") +
      getSubEvent(away, "Lineout throw", "Middle won") +
      getSubEvent(away, "Lineout throw", "Back won") +
      getSubEvent(away, "Lineout throw", "Overthrow Won");

    const statsList = [
      {
        stat: "Tries scored",
        home: getSubEvent(home, "Score", "Try"),
        away: getSubEvent(away, "Score", "Try"),
      },
      {
        stat: "successful conversions",
        home: getSubEvent(home, "Score", "Successful Conversion"),
        away: getSubEvent(away, "Score", "Successful Conversion"),
      },
      {
        stat: "Visit in opponents 22",
        home: getStat(home, "Visit in opponents 22"),
        away: getStat(away, "Visit in opponents 22"),
      },
      {
        stat: "Penalties conceded",
        home: getStat(home, "Penalties conceded"),
        away: getStat(away, "Penalties conceded"),
      },
      {
        stat: "Handling Errors",
        home:
          getStat(home, "Lost ball in carry") +
          getStat(home, "Knock ons") +
          getStat(home, "Forward passes") +
          getStat(home, "Incomplete Pass"),
        away:
          getStat(away, "Lost ball in carry") +
          getStat(away, "Knock ons") +
          getStat(away, "Forward passes") +
          getStat(away, "Incomplete Pass"),
      },
      {
        stat: "scrums won / fed",
        home: `${getSubEvent(home, "Scrums", "Won")} / ${getStat(
          home,
          "Scrums"
        )}`,
        away: `${getSubEvent(away, "Scrums", "Won")} / ${getStat(
          away,
          "Scrums"
        )}`,
      },
      {
        stat: "lineouts won / thrown",
        home: `${hLineoutsWon} / ${getStat(home, "Lineout throw")}`,
        away: `${aLineoutsWon} / ${getStat(away, "Lineout throw")}`,
      },
      {
        stat: "Turnovers Won",
        home: getStat(home, "Turn overs"),
        away: getStat(away, "Turn overs"),
      },

      // {
      //   stat: "Passes",
      //   home: getStat(home, "Pass"),
      //   away: getStat(away, "Pass"),
      // },
      // {
      //   stat: "Carries",
      //   home: getStat(home, "Carries"),
      //   away: getStat(away, "Carries"),
      // },
      // {
      //   stat: "Line Breaks",
      //   home: getStat(home, "Linebreak"),
      //   away: getStat(away, "Linebreak"),
      // },
      // {
      //   stat: "Offloads",
      //   home: getStat(home, "Offloads"),
      //   away: getStat(away, "Offloads"),
      // },
      // {
      //   stat: "Kicks",
      //   home: getStat(home, "Kick for territory"),
      //   away: getStat(away, "Kick for territory"),
      // },
    ];

    (cards.Homeyellow >= 1 || cards.Awayyellow >= 1) &&
      statsList.push({
        stat: "Yellow cards",
        home: `${cards.Homeyellow}`,
        away: `${cards.Awayyellow}`,
      });

    (cards.Homered >= 1 || cards.Awayred >= 1) &&
      statsList.push({
        stat: "red cards",
        home: `${cards.Homered}`,
        away: `${cards.Awayred}`,
      });

    return statsList;
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade-out
      setTimeout(() => {
        const nextIndex = (index + 1) % stats.length;
        setCurrentStats([stats[nextIndex]]);
        setIndex(nextIndex);
        setFade(false); // Start fade-in
      }, 300); // Delay content change until fade-out is done
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [index, stats]);

  if (isLoading) return <Spinner />;

  const details = data?.fixture[0];
  // const scores = data?.scores;

  return (
    <main className="pt-16 relative h-screen">
      <div className="absolute bottom-0 w-full mb-1">
        <div className="container h-12 mx-auto flex items-center bg-[#023270] ">
          {/* <div className="bg-black h-full w-12 flex items-center justify-center">
          <span className="text-white text-xl font-bold">HT</span>
        </div> */}
          <div className="flex gap-1 w-4/5 mx-auto">
            <div className="flex items-center w-1/4 justify-center rounded-sm text-white font-bold bg-red-500">
              {details?.team1_name}
            </div>
            <div
              className={`flex h-8 w-2/3 mx-auto transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-1/4 border flex items-center justify-center font-semibold text-blue-800 bg-white rounded-sm">
                {`${currentStats[0].home}`}
              </div>
              <div className="w-1/2 mx-1 flex justify-center items-center text-nowrap text-xs text-white font-bold uppercase rounded-sm bg-primary">
                {`${currentStats[0].stat}`}
              </div>
              <div className="w-1/4 border flex items-center justify-center font-semibold text-blue-800 bg-white rounded-sm">
                {`${currentStats[0].away}`}
              </div>
            </div>
            <div className="flex items-center w-1/4 justify-center rounded-sm font-bold bg-yellow-500">
              {details?.team2_name}
            </div>
          </div>

          <div className="w-20 h-10">
            <img src={tisini} alt="Tisini" className="w-full h-full" />
          </div>
        </div>
      </div>
    </main>
  );
};
