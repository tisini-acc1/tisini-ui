import { Stats } from "../types/scores";

export const getStat = (arry: Stats, name: string) => {
  const value = arry?.[name]?.total;
  return value && !isNaN(parseInt(value)) ? parseInt(value) : 0;
};

export const getEvent = (arry: Stats, eventId: string) => {
  const value = Object.values(arry).filter(
    (event) => event.event_id === eventId
  );

  return parseInt(value[0].total);
};

export const getSubEvent = (
  array: Stats,
  eventId: string,
  subEventId: string
) => {
  const event = Object.values(array).filter(
    (item) => item.event_id === eventId
  );

  const stat = event[0]["sub-event"].filter(
    (item) => item.subeventid === subEventId
  );

  return parseInt(stat[0].totalsubevent);
};

export const calcBallPosession = (homeArry: Stats, awayArry: Stats) => {
  const homePasses =
    getStat(homeArry, "Pass") +
    getStat(homeArry, "Incomplete Pass") +
    getStat(homeArry, "Progress Pass");

  const awayPasses =
    getStat(awayArry, "Pass") +
    getStat(awayArry, "Incomplete Pass") +
    getStat(awayArry, "Progress Pass");

  const total = homePasses + awayPasses;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

export const calcRugbyPosession = (homeArry: Stats, awayArry: Stats) => {
  const homePasses =
    getStat(homeArry, "Pass") +
    getStat(homeArry, "Incomplete Pass") +
    getStat(homeArry, "Forward pass");

  const awayPasses =
    getStat(awayArry, "Pass") +
    getStat(awayArry, "Incomplete Pass") +
    getStat(awayArry, "Forward pass");

  const total = homePasses + awayPasses;

  const home = Math.round((homePasses / total) * 100);
  const away = Math.round((awayPasses / total) * 100);

  return { home, away };
};

// does not factor in progressive passes
// export const passAccuracy = (
//   arry: Stats[],
//   complete: string,
//   incomplete: string
// ) => {
//   const compPasses = getStat(arry, complete);
//   const totalPasses = compPasses + getStat(arry, incomplete);

//   return Math.round((compPasses / totalPasses) * 100);
// };
