import { Link } from "react-router-dom";

import homeImg from "@/assets/homeLogo.png";
import awayImg from "@/assets/awayLogo.png";
import { Fixture } from "@/lib/types/scores";
import { teamImages } from "@/lib/constants/site_images";

const StreamFixture = ({ fixture }: { fixture: Fixture }) => {
  const homeWin = fixture.home_score > fixture.away_score;
  const awayWin = fixture.away_score > fixture.home_score;

  const homeLogo = teamImages[fixture.team1_id] ?? homeImg;
  const awayLogo = teamImages[fixture.team2_id] ?? awayImg;

  return (
    <div className="m-1 bg-slate-100 border-b border-gray-300 rounded-md py-3 hover:bg-gray-300 cursor-pointer text-primary flex">
      <div className="grid grid-cols-12 gap-2 text-sm font-semibold w-4/5">
        <div className="col-span-5 flex gap-1 lg:flex-col flex-row-reverse lg:justify-center items-center">
          <img className="w-10 h-10 " src={homeLogo} alt="" />
          <div className=" text-gray-450 text-right">{fixture.team1_name}</div>
        </div>

        <div className="col-span-2 flex items-center justify-center">
          {fixture.game_status === "notstarted" ? (
            fixture.game_time === "" ? (
              <div className="animate-spin-slow">⌛</div>
            ) : (
              <div>{fixture.game_time}</div>
            )
          ) : (
            <div
              className="flex flex-col items-center font-bold
            lg:text-3xl text-base"
            >
              <div className="flex">
                <div className={homeWin ? "text-gray-900" : "text-gray-500"}>
                  {fixture.home_score}
                </div>

                <div className="mx-1 md:mx-2">&ndash;</div>

                <div className={awayWin ? "text-gray-900" : "text-gray-500"}>
                  {fixture.away_score}
                </div>
              </div>
              <div className="text-xs">
                {fixture.game_status === "ended"
                  ? "FT"
                  : (fixture?.minute == "45" || fixture?.minute == "7") &&
                    fixture.game_moment == "secondhalf"
                  ? "HT"
                  : fixture.minute}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 flex gap-1 lg:flex-col flex-row lg:justify-center items-center">
          <img className="w-10 h-10" src={awayLogo} alt="" />
          <div>{fixture.team2_name}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          to={`/streams/stats/${fixture.id}`}
          className="text-md px-4 text-center bg-red-400 hover:bg-red-500 text-light py-2 rounded-md w-full"
        >
          Stats
        </Link>
        <Link
          to={`/streams/lowerthird/${fixture.id}`}
          className="text-md px-4 text-center bg-red-400 hover:bg-red-500 text-light py-2 rounded-md w-full"
        >
          Lower 3rd
        </Link>
      </div>
    </div>
  );
};

export default StreamFixture;
