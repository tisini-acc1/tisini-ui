import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

import kawowo from "@/assets/img/kawowo.jpg";
import tisini from "@/assets/img/tisini.png";
// import league from "@/assets/img/nile-special.png";
import { getStat } from "@/lib/scores/calculations";
import { useEffect, useState } from "react";

export const LowerThird = () => {
  const { fixtureId } = useParams();

  const { data, isLoading } = useQuery<SingleFixtureStats, Error>(
    ["footballById"],
    () => FetchFixtureById(fixtureId!)
  );

  const details = data?.fixture[0];
  const home = data?.home as Stats;
  const away = data?.away as Stats;
  const scores = data?.scores;

  if (isLoading) return <Spinner />;

  //   const hTackles = getStat(home, "Tackles") + getStat(home, "Missed tackles");
  //   const aTackles = getStat(away, "Tackles") + getStat(away, "Missed tackles");

  const hLineoutsWon = home["Lineouts"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  //   const aLineoutsWon = away["Lineouts"]["sub-event"].filter(
  //     (item) => item.subeventname === "Won"
  //   );

  const hScrumsWon = home["Scrums"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  const aScrumsWon = away["Scrums"]["sub-event"].filter(
    (item) => item.subeventname === "Won"
  );

  const stats = [
    {
      stat: "Visit in own 22",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Tries",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Passes",
      home: getStat(home, "Pass"),
      away: getStat(away, "Pass"),
    },
    {
      stat: "Carries",
      home: getStat(home, "Carries"),
      away: getStat(away, "Carries"),
    },
    {
      stat: "Turnovers Won",
      home: getStat(home, "Turn overs"),
      away: getStat(away, "Turn overs"),
    },
    {
      stat: "Line Breaks",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Offloads",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Kicks",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Handling Errors",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Penalties",
      home: getStat(home, "Penalties conceded"),
      away: getStat(away, "Penalties conceded"),
    },
    {
      stat: "Tackles",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Missed Tackles",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Lineouts Won",
      home: `${hLineoutsWon[0].totalsubevent} / ${getStat(home, "Lineouts")}`,
      away: `${hLineoutsWon[0].totalsubevent} / ${getStat(away, "Lineouts")}`,
    },
    {
      stat: "Lineouts Lost",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
    {
      stat: "Scrums Won",
      home: `${hScrumsWon[0].totalsubevent} / ${getStat(home, "Scrums")}`,
      away: `${aScrumsWon[0].totalsubevent} / ${getStat(away, "Scrums")}`,
    },
    {
      stat: "Scrums Lost",
      home: getStat(home, "Visit in own 22"),
      away: getStat(away, "Visit in own 22"),
    },
  ];

  const [currentStats, setCurrentStats] = useState([stats[0], stats[1]]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 2) % stats.length;
      setCurrentStats([stats[nextIndex], stats[nextIndex + 1]]);
      setIndex(nextIndex);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [index, stats]);

  return (
    <main className="pt-16 relative h-screen">
      <div className="flex justify-center items-center text-white font-bold bg-sky-900 absolute bottom-0 w-full">
        <div className="">
          <img src={kawowo} alt="kawowo" height={150} width={150} />
        </div>
        <div className="w-4/5 mx-auto flex">
          <div className="w-2/6 flex justify-evenly items-center">
            <div>{details?.team1_name}</div>
            <div className="flex gap-0.5">
              <div className="p-2 bg-blue-500">{scores?.Home}</div>
              <div className="p-2 bg-blue-500">{scores?.Away}</div>
            </div>
            <div>{details?.team2_name}</div>
          </div>
          <div className="flex items-center w-2/3">
            <div className="p-2 bg-slate-50 text-black">HT</div>
            <div className=" flex w-full justify-around">
              <div className="flex gap-4">
                <div>{currentStats[0].stat}</div>
                <div>{`${currentStats[0].home} | ${currentStats[0].away}`}</div>
              </div>

              <div className="text-red-500 font-bold">|</div>

              <div className=" flex gap-4">
                <div>{currentStats[1].stat}</div>
                <div>{`${currentStats[1].home} | ${currentStats[1].away}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={tisini}
            alt="Tisini"
            height={120}
            width={100}
            className=""
          />
        </div>
      </div>
    </main>
  );
};
