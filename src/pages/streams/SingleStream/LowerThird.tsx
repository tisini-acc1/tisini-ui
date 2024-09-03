import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Spinner from "@/components/spinner/Spinner";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";
import { SingleFixtureStats, Stats } from "@/lib/types/scores";

import kawowo from "@/assets/img/kawowo.jpg";
import tisini from "@/assets/img/tisini.png";
// import league from "@/assets/img/nile-special.png";
import { getStat } from "@/lib/scores/calculations";

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

  // console.log(details?.game_status);

  const stats = [
    {
      stat: "Visit in opponents 22",
      home: getStat(home, "Visit in opponents 22"),
      away: getStat(away, "Visit in opponents 22"),
    },
    {
      stat: "Tries",
      home: home["Score"]["sub-event"].filter(
        (item) => item.subeventname === "Try"
      )[0].totalsubevent,
      away: away["Score"]["sub-event"].filter(
        (item) => item.subeventname === "Try"
      )[0].totalsubevent,
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
      home: getStat(home, "Linebreak"),
      away: getStat(away, "Linebreak"),
    },
    {
      stat: "Offloads",
      home: getStat(home, "Offloads"),
      away: getStat(away, "Offloads"),
    },
    {
      stat: "Kicks",
      home: getStat(home, "Kick for territory"),
      away: getStat(away, "Kick for territory"),
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
      stat: "Penalties",
      home: getStat(home, "Penalties conceded"),
      away: getStat(away, "Penalties conceded"),
    },
    {
      stat: "Tackles",
      home: getStat(home, "Tackles"),
      away: getStat(away, "Tackles"),
    },
    {
      stat: "Missed Tackles",
      home: getStat(home, "Missed tackles"),
      away: getStat(away, "Missed tackles"),
    },
    {
      stat: "Lineouts Won",
      home: home["Lineouts"]["sub-event"].filter(
        (item) => item.subeventname === "Won"
      )[0].totalsubevent,
      away: away["Lineouts"]["sub-event"].filter(
        (item) => item.subeventname === "Won"
      )[0].totalsubevent,
    },
    {
      stat: "Lineouts Lost",
      home: home["Lineouts"]["sub-event"].filter(
        (item) => item.subeventname === "Lost"
      )[0].totalsubevent,
      away: home["Lineouts"]["sub-event"].filter(
        (item) => item.subeventname === "Lost"
      )[0].totalsubevent,
    },
    {
      stat: "Scrums Won",
      home: home["Scrums"]["sub-event"].filter(
        (item) => item.subeventname === "Won"
      )[0].totalsubevent,
      away: away["Scrums"]["sub-event"].filter(
        (item) => item.subeventname === "Won"
      )[0].totalsubevent,
    },
    {
      stat: "Scrums Lost",
      home: home["Scrums"]["sub-event"].filter(
        (item) => item.subeventname === "Lost"
      )[0].totalsubevent,
      away: away["Scrums"]["sub-event"].filter(
        (item) => item.subeventname === "Lost"
      )[0].totalsubevent,
    },
  ];

  const [currentStats, setCurrentStats] = useState([stats[0], stats[1]]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade-out
      setTimeout(() => {
        const nextIndex = (index + 2) % stats.length;
        setCurrentStats([stats[nextIndex], stats[nextIndex + 1]]);
        setIndex(nextIndex);
        setFade(false); // Start fade-in
      }, 300); // Delay content change until fade-out is done
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
              <div className="p-2 bg-blue-500 w-8 text-center">
                {scores?.Home}
              </div>
              <div className="p-2 bg-blue-500 w-8 text-center">
                {scores?.Away}
              </div>
            </div>
            <div>{details?.team2_name}</div>
          </div>
          <div className="flex items-center w-2/3">
            <div className="p-2 bg-slate-50 text-black">
              {details?.game_status === "ended"
                ? "FT"
                : details?.minute == "45" &&
                  details?.game_moment == "secondhalf"
                ? "HT"
                : details?.minute}
            </div>
            <div
              className={`flex items-center w-2/3 transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex w-full justify-around">
                <div className="flex gap-4">
                  <div>{currentStats[0].stat}</div>
                  <div>{`${currentStats[0].home} | ${currentStats[0].away}`}</div>
                </div>
                <div className="text-red-500 font-bold">|</div>
                <div className="flex gap-4">
                  <div>{currentStats[1].stat}</div>
                  <div>{`${currentStats[1].home} | ${currentStats[1].away}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img src={tisini} alt="Tisini" height={80} width={80} className="" />
        </div>
      </div>
    </main>
  );
};
