import { useNavigate } from "react-router-dom";

import homeLogo from "../../assets/homeLogo.png";
import awayLogo from "../../assets/awayLogo.png";

type Props = {
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  fixtureId: string;
  fixtureType: string;
  fixtureState: string;
  minute: string;
  gameMoment: string;
};

const SingleResult = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  fixtureId,
  fixtureType,
  fixtureState,
  gameMoment,
  minute,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (fixtureType === "football") {
      navigate(`/scores/football/${fixtureId}`);
    } else {
      navigate(`/scores/rugby/${fixtureId}`);
    }
  };

  const homeWin = homeScore > awayScore;
  const awayWin = awayScore > homeScore;

  return (
    <div
      onClick={handleClick}
      className="border-b border-gray-300 py-3 hover:bg-gray-300 cursor-pointer text-primary"
    >
      <div className="grid grid-cols-12 gap-2 text-sm font-semibold">
        <div className="col-span-5 flex gap-1 lg:flex-col flex-row-reverse lg:justify-center items-center">
          <img className="w-10 h-10" src={homeLogo} alt="" />
          <div className=" text-gray-450 text-right">{homeTeam}</div>
        </div>

        <div className="col-span-2 flex items-center justify-center">
          {fixtureState === "notstarted" ? (
            <div className="animate-spin-slow">⌛</div>
          ) : (
            <div
              className="flex flex-col items-center font-bold
            lg:text-3xl text-base"
            >
              <div className="flex">
                <div className={homeWin ? "text-gray-900" : "text-gray-500"}>
                  {homeScore}
                </div>

                <div className="mx-1 md:mx-2">&ndash;</div>

                <div className={awayWin ? "text-gray-900" : "text-gray-500"}>
                  {awayScore}
                </div>
              </div>
              <div className="text-xs">
                {fixtureState === "ended"
                  ? "FT"
                  : minute == "45" && gameMoment == "secondhalf"
                  ? "HT"
                  : minute}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 flex gap-1 lg:flex-col flex-row lg:justify-center items-center">
          <img className="w-10 h-10" src={awayLogo} alt="" />
          <div>{awayTeam}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
