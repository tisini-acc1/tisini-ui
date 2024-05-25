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
};

const SingleResult = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  fixtureId,
  fixtureType,
  fixtureState,
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

  return (
    <div
      onClick={handleClick}
      className="border-b border-gray-900 py-3 hover:bg-red-400 cursor-pointer text-primary"
    >
      <div className="grid grid-cols-12 gap-2 text-sm font-semibold whitespace-nowrap">
        <div className="col-span-5 flex gap-1 lg:flex-col flex-row-reverse lg:justify-center items-center">
          <img className="lg:w-10 lg:h-10 w-4 h-4" src={homeLogo} alt="" />
          <div className=" text-gray-450">{homeTeam}</div>
        </div>

        <div className="col-span-2 flex items-center justify-center">
          {fixtureState !== "notstarted" && (
            <div
              className="flex flex-col items-center font-bold
            lg:text-3xl text-base"
            >
              <div>
                {homeScore} - {awayScore}
              </div>
              <div className="text-xs">
                {fixtureState === "started" ? minute : "FT"}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 flex gap-1 lg:flex-col flex-row lg:justify-center items-center">
          <img className="lg:w-10 lg:h-10 h-5 w-5" src={awayLogo} alt="" />
          <div>{awayTeam}</div>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;
