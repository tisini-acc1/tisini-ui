import { Zap } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import sportpesa7s from "@/assets/tournaments/Sportpesa7s.png";
import { useLeague } from "@/context/LeagueContext";

const navData: { [key: string]: { circuit: string; id: string }[] } = {
  men: [
    { circuit: "Christie 7s", id: "111" },
    { circuit: "Prinsloo 7s", id: "104" },
    { circuit: "Driftwood 7s", id: "103" },
    // { circuit: "Driftwood", id: "" },
    // { circuit: "Kabeberi 7s", id: "" },
    // { circuit: "Dala 7s", id: "" },
  ],
  women: [{ circuit: "Prinsloo 7s", id: "105" }],
};

const Navbar = () => {
  const [gender, setGender] = useState<string>("men");
  const [leagues, setLeagues] = useState<{ circuit: string; id: string }[]>([]);

  const navigate = useNavigate();

  const { season, setSeason } = useLeague();

  useEffect(() => {
    if (gender) {
      setLeagues(navData[gender]);
    }
  }, [gender, navData]);

  useEffect(() => {
    if (!leagues || leagues.length === 0) return;

    const seasonExists = leagues.some((l) => l.id === season);

    if (!seasonExists) {
      setSeason(leagues[0].id);
    }
  }, [leagues, season]);

  return (
    <nav className="sticky top-0">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-2 py-2">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="bg-blue-600 p-2 rounded-full shadow-md border border-blue-400">
                <img
                  src={sportpesa7s}
                  alt="Sportpesa 7s Logo"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div
                onClick={() => navigate("/scores/leagues/sportpesa-7s")}
                className="pt-2 cursor-pointer"
              >
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  Sportpesa 7s
                </h1>
                <p className="text-blue-200 text-xs md:text-sm">
                  Real-time rugby scores & updates
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-2 mt-2 md:mt-0">
              <div className="flex gap-2">
                {Object.keys(navData).map((item) => (
                  <div
                    onClick={() => setGender(item)} // Pass the item to handleClick
                    key={item}
                    className={`p-2 px-3 rounded-md text-sm font-medium cursor-pointer shadow-sm transition-colors capitalize ${
                      gender === item.toLowerCase()
                        ? "bg-blue-900 text-yellow-300 font-bold"
                        : "bg-blue-600 hover:bg-blue-400 text-blue-100"
                    }
                  `}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-700 px-3 py-2 rounded-full transition-colors shadow-sm">
                <Zap className="w-4 h-4 text-yellow-300" fill="currentColor" />
                <NavLink
                  to={"/scores/leagues/sportpesa-7s/scorers"}
                  className="font-semibold text-xs sm:text-sm"
                >
                  Top Scorers
                </NavLink>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-2 rounded-b-md bg-blue-700 overflow-x-auto scrollbar-hide">
            {leagues.map((league) => (
              <div
                key={league.circuit}
                onClick={() => setSeason(league.id)}
                className={`transition-colors p-1.5 px-3 rounded-md whitespace-nowrap text-sm font-medium cursor-pointer shadow-sm ${
                  season === league.id
                    ? "bg-blue-900 text-yellow-300 font-bold"
                    : "bg-blue-750 hover:bg-blue-400 text-blue-100"
                }`}
              >
                {league.circuit}
              </div>
            ))}
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
