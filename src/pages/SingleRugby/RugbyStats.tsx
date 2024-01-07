import { Box } from "@mui/material";

import { Cards, Stats } from "@/lib/types/scores";
import StatsRow from "@/components/scores/singleFixture/StatsRow";
import StatsHalf from "@/components/scores/singleFixture/StatsHalf";

type StatsProps = {
  home: Stats[];
  away: Stats[];
  cards: Cards;
};

const RugbyStats = ({ home, away, cards }: StatsProps) => {
  const getStat = (arry: Stats[], name: string) => {
    let stat = 0;
    if (!arry) {
      return stat;
    }

    for (const item of arry) {
      if (item.name === name) {
        stat += parseInt(item.total);
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
        homeStat={getStat(home, "Carries")}
        stat={"Carries"}
        awayStat={getStat(away, "Carries")}
      />

      <StatsRow
        homeStat={getStat(home, "Pass") + getStat(home, "Forward passes")}
        stat={"Total passes"}
        awayStat={getStat(away, "Pass") + getStat(home, "Forward passes")}
      />

      <StatsRow
        homeStat={
          !passAccuracy(home, "Pass", "Incomplete Pass")
            ? 0
            : `${passAccuracy(home, "Pass", "Incomplete Pass")}"%"`
        }
        stat={"Pass accuracy"}
        awayStat={
          !passAccuracy(away, "Pass", "Incomplete Pass")
            ? 0
            : `${passAccuracy(away, "Pass", "Incomplete Pass")}"%"`
        }
      />

      <StatsRow
        homeStat={getStat(home, "Tackles")}
        stat={"Tackles"}
        awayStat={getStat(away, "Tackles")}
      />

      <StatsRow
        homeStat={getStat(home, "Penalties conceded")}
        stat={"Penalties conceded"}
        awayStat={getStat(away, "Penalties conceded")}
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
    </Box>
  );
};

export default RugbyStats;
