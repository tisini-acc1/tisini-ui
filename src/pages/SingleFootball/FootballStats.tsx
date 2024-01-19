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

  // does not factor in progressive passes
  const passAccuracy = (
    arry: Stats[],
    complete: string,
    incomplete: string
  ) => {
    const compPasses = getStat(arry, complete);
    const totalPasses = compPasses + getStat(arry, incomplete);

    return Math.round((compPasses / totalPasses) * 100);
  };

  const calcPosession = (homeArry: Stats[], awayArry: Stats[]) => {
    const passes = (arry: Stats[]) => {
      return (
        getStat(arry, "Pass") +
        getStat(arry, "Incomplete Pass") +
        getStat(arry, "Progress Pass")
      );
    };

    const homePasses = passes(homeArry);
    const awayPasses = passes(awayArry);
    const total = homePasses + awayPasses;

    const home = Math.round((homePasses / total) * 100);
    const away = Math.round((awayPasses / total) * 100);

    return { home, away };
  };

  const posession = calcPosession(home, away);

  return (
    <Box mt={1} display="flex" flexDirection="column">
      <StatsHalf />

      {home.length !== 0 && away.length !== 0 && (
        <StatsRow
          homeStat={`${posession.home}%`}
          stat={"Ball Possession"}
          awayStat={`${posession.away}%`}
        />
      )}

      <StatsRow
        homeStat={getStat(home, "Shot") + getStat(home, "Goal")}
        stat={"Attempts"}
        awayStat={getStat(away, "Shot") + getStat(away, "Goal")}
      />

      <StatsRow
        homeStat={
          getStat(home, "Pass") +
          getStat(home, "Incomplete Pass") +
          getStat(home, "Progress Pass")
        }
        stat={"Total passes"}
        awayStat={
          getStat(away, "Pass") +
          getStat(away, "Incomplete Pass") +
          getStat(away, "Progress Pass")
        }
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
        stat={"Corner kicks"}
        awayStat={getStat(away, "Corner")}
      />
    </Box>
  );
};

export default FootballStats;
