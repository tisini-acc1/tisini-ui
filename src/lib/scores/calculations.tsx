import { Stats } from "../types/scores";

export const getStat = (arry: Stats[], name: string) => {
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

export const calcPosession = (homeArry: Stats[], awayArry: Stats[]) => {
  const passes = (arry: Stats[]) => {
    return (
      getStat(arry, "Pass") +
      getStat(arry, "Incomplete Pass") +
      getStat(arry, "Progress Pass") +
      getStat(arry, "Forward pass")
    );
  };

  const homePasses = passes(homeArry);
  const awayPasses = passes(awayArry);
  const total = homePasses + awayPasses;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

// does not factor in progressive passes
export const passAccuracy = (
  arry: Stats[],
  complete: string,
  incomplete: string
) => {
  const compPasses = getStat(arry, complete);
  const totalPasses = compPasses + getStat(arry, incomplete);

  return Math.round((compPasses / totalPasses) * 100);
};
