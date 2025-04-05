import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/data/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

// import kawowo from "@/assets/img/kawowo.jpg";
import tisini from "@/assets/img/tisini-logo.png";
// import league from "@/assets/img/nile-special.png";
import { getEvent, getStat, getSubEvent } from "@/lib/data/calculations";

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

  // console.log(data);

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
      getSubEvent(home, "151", "377") +
      getSubEvent(home, "151", "378") +
      getSubEvent(home, "151", "379") +
      getSubEvent(home, "151", "391");
    const aLineoutsWon =
      getSubEvent(away, "151", "377") +
      getSubEvent(away, "151", "378") +
      getSubEvent(away, "151", "379") +
      getSubEvent(away, "151", "391");

    // scrum won + lost
    const hScrumsFed =
      getSubEvent(home, "51", "38") + getSubEvent(home, "51", "39");
    const aScrumsFed =
      getSubEvent(away, "51", "38") + getSubEvent(away, "51", "39");

    const statsList = [
      {
        stat: "Tries scored",
        home: getSubEvent(home, "49", "66"),
        away: getSubEvent(away, "49", "66"),
      },
      {
        stat: "successful conversions",
        home: getSubEvent(home, "49", "60"),
        away: getSubEvent(away, "49", "60"),
      },
      {
        stat: "Visit in opponents 22",
        home: getEvent(home, "104"),
        away: getEvent(away, "104"),
      },
      {
        stat: "Penalties conceded",
        home: getEvent(home, "46"),
        away: getEvent(away, "46"),
      },
      {
        stat: "Handling Errors",
        home:
          getEvent(home, "103") +
          getStat(home, "Knock ons") +
          getEvent(home, "41") +
          getEvent(home, "40") +
          getEvent(home, "87"),
        away:
          getEvent(away, "103") +
          getStat(away, "Knock ons") +
          getEvent(away, "41") +
          getEvent(away, "40") +
          getEvent(away, "87"),
      },
      {
        stat: "scrums won / fed",
        home: `${getSubEvent(home, "51", "38")} / ${hScrumsFed}`,
        away: `${getSubEvent(away, "51", "38")} / ${aScrumsFed}`,
      },
      {
        stat: "lineouts won / thrown",
        home: `${hLineoutsWon} / ${getEvent(home, "151")}`,
        away: `${aLineoutsWon} / ${getEvent(away, "151")}`,
      },
      {
        stat: "Turnovers Won",
        home: getEvent(home, "45"),
        away: getEvent(away, "45"),
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
  const scores = data?.scores;

  return (
    <main className="pt-10 relative h-screen">
      {details?.game_status !== "notstarted" && (
        <div className="pl-10 font-bold ">
          <div className="flex gap-3 items-center bg-[#023270] w-fit rounded-md">
            <div className="bg-red-500 p-2 rounded-md">
              {details?.team1_id === "1956" ? "KCB" : "Home"}
            </div>
            <div className="font-catamaran text-2xl text-white">
              {scores?.Home} - {scores?.Away}
            </div>
            <div className="bg-yellow-500 p-2 rounded-md text-white">
              {details?.team2_id === "1954" ? "OIL" : "Away"}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full mb-1">
        <div className="max-w-7xl h-12 mx-auto flex items-center bg-[#023270] ">
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
