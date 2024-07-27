import { FixtureDetails, Lineup } from "@/lib/types/scores";
import RugbyLineups from "@/components/scores/lineups/RugbyLineups";
import FootballLineups from "@/components/scores/lineups/FootballLineups";

type LineupsProps = {
  teams: FixtureDetails;
  squads: Lineup[];
  fixType: string;
};

const FixtureLineups = ({ teams, squads, fixType }: LineupsProps) => {
  if (fixType === "football") {
    return <FootballLineups teams={teams} squads={squads} />;
  }

  return <RugbyLineups teams={teams} squads={squads} />;
};

export default FixtureLineups;
