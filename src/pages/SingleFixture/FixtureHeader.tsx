import homeLogo from "@/assets/homeLogo.png";
import awayLogo from "@/assets/awayLogo.png";
import { FixtureDetails, Scores } from "@/lib/types/scores";

type HeaderProps = {
  teamDetails: FixtureDetails[];
  scores: Scores;
};

const FixtureHeader = ({ teamDetails, scores }: HeaderProps) => {
  const teams = teamDetails[0];

  console.log(teams.fixture_type);
  return (
    <div className="flex flex-col justify-between">
      {/* Match details */}
      <div className="flex justify-between border-b border-black p-1">
        <div className="flex items-center rounded-md bg-gray-300 w">
          <div className="text-red-500 font-bold text-xs py-1 px-2 md:text-lg whitespace-nowrap text-ellipsis">
            {teams.fixture_type === "football"
              ? `Round: ${teams["matchday"]}`
              : `${teams.matchday}`}
          </div>
        </div>

        <div className="text-gray-700 text-base md:text-lg font-bold pt-2 whitespace-nowrap text-ellipsis capitalize">
          {teams["league"]}
        </div>

        <div className="flex items-center rounded-md bg-gray-300">
          <div className="text-red-500 font-bold text-xs py-1 px-2 md:text-lg whitespace-nowrap text-ellipsis">
            {teams["game_date"].split(" ")[0]}
          </div>
        </div>
      </div>

      {/* Match content (team names and scores) */}
      <div className="flex justify-evenly p-4">
        {/* Home details */}
        <div className="flex flex-col items-center space-y-1 w-2/5">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center h-14 w-14 p-1 bg-gray-400 rounded-full">
              <img src={homeLogo} alt="City Stars" height="40em" width="40em" />
            </div>
          </div>

          <div className="text-sm md:text-xl font-semibold">
            {teams["team1_name"]}
          </div>
        </div>

        {/* Scores & Time */}
        <div className="flex flex-col items-center justify-center w-1/5">
          {teams.game_status === "notstarted" ? (
            <div className="flex items-center justify-center">"15:00"</div>
          ) : (
            <div>
              <div className="flex font-bold text-xl md:text-3xl">
                <div className="">{scores.Home}</div>

                <div className="mx-1 md:mx-2">&ndash;</div>

                <div className="">{scores.Away}</div>
              </div>
              <div className="font-semibold text-sm md:text-base text-center">
                {teams["game_status"] === "started" ? teams["minute"] : "FT"}
              </div>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center space-y-1 w-2/5">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center h-14 w-14 p-1 bg-gray-400 rounded-full">
              <img src={awayLogo} alt="City Stars" height="40em" width="40em" />
            </div>
          </div>

          <div className="text-sm md:text-xl font-semibold">
            {teams["team2_name"]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixtureHeader;
