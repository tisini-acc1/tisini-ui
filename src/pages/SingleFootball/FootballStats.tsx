import { Box } from "@mui/material";

import { Cards, Fouls, Stats } from "@/lib/types/scores";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";

type StatsProps = {
  home: Stats[];
  away: Stats[];
  cards: Cards;
  fouls: Fouls;
};

const FootballStats = ({ home, away, cards, fouls }: StatsProps) => {
  const getStat = (arry: Stats[], name: string) => {
    let stat = 0;
    if (!arry) {
      return stat;
    }

    for (const item of arry) {
      if (item.name === name) {
        stat += parseInt(item.total, 10);
      }
    }

    return stat;
  };

  const passAccuracy = (
    arry: Stats[],
    complete: string,
    incomplete: string
  ) => {
    const compPasses = getStat(arry, complete);
    const totalPasses = compPasses + getStat(arry, incomplete);

    return Math.round((compPasses / totalPasses) * 100);
  };

  return (
    <Box mt={1} display="flex" flexDirection="column">
      <StatsHalf />

      <StatsRow
        homeStat={getStat(home, "Shot") + getStat(home, "Goal")}
        stat={"Attempts"}
        awayStat={getStat(away, "Shot") + getStat(away, "Goal")}
      />

      <StatsRow
        homeStat={getStat(home, "Pass") + getStat(home, "Incomplete Pass")}
        stat={"Total passes"}
        awayStat={getStat(away, "Pass") + getStat(away, "Incomplete Pass")}
      />

      <StatsRow
        homeStat={
          !passAccuracy(home, "Pass", "Incomplete Pass")
            ? 0
            : `${passAccuracy(home, "Pass", "Incomplete Pass")}%`
        }
        stat={"Pass accuracy"}
        awayStat={
          !passAccuracy(away, "Pass", "Incomplete Pass")
            ? 0
            : `${passAccuracy(away, "Pass", "Incomplete Pass")}%`
        }
      />

      <StatsRow
        homeStat={fouls.Homecommitted}
        stat={"Fouls"}
        awayStat={fouls.Awaycommitted}
      />

      <StatsRow
        homeStat={cards.Homeyellow}
        stat={"Yellow cards"}
        awayStat={cards.Awayyellow}
      />

      <StatsRow
        homeStat={cards.Homered}
        stat={"Red cards"}
        awayStat={cards.Awayred}
      />

      <StatsRow
        homeStat={getStat(home, "Offside")}
        stat={"Offsides"}
        awayStat={getStat(away, "Offside")}
      />

      <StatsRow
        homeStat={getStat(home, "Corner")}
        stat={"Corners"}
        awayStat={getStat(away, "Corner")}
      />
    </Box>
  );
};

export default FootballStats;
