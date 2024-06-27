import { Stats } from "@/lib/types/scores";
import React from "react";

const FixtureStats = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex">
          <div>All</div>
          <div>1ST</div>
          <div>2ND</div>
        </div>
      </div>

      <div className="flex flex-col space-y-2 bg-red-400"></div>
    </div>
  );
};

export const getStat = (arry: Stats[], name: string) => {
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

export const passAccuracy = (
  arry: Stats[],
  complete: string,
  incomplete: string
) => {
  const compPasses = getStat(arry, complete);
  const totalPasses = compPasses + getStat(arry, incomplete);

  return Math.round((compPasses / totalPasses) * 100);
};

export const calcPosession = (homeArry: Stats[], awayArry: Stats[]) => {
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

export default FixtureStats;
