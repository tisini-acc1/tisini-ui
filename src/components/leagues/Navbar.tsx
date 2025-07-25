import { Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

import driftwood from "@/assets/tournaments/Dirftwood.png";

const Navbar = () => {
  return (
    <nav>
      <header className="bg-blue-600 text-white shadow-lg rounded-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block bg-orange-500 p-2 rounded-full">
                {/* <Trophy className="w-8 h-8 text-white" /> */}
                <img src={driftwood} alt="" className="w-12 h-12 " />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Driftwood 7s
                </h1>
                <p className="text-green-200 text-sm">
                  Real-time rugby scores & updates
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-orange-500 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4" />
              <NavLink
                to={"/scorers"}
                className="font-semibold text-sm sm:text-xs"
              >
                Top Scorers
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
