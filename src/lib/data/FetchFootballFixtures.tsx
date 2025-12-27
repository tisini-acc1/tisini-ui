import axios from "axios";
import { Fixture } from "../types/scores";

const fetchFootballFixtures = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=football"
  );

  return res.data;
};

export default fetchFootballFixtures;

export const matchDayFixtures = async (fixType: string, matchDay: string) => {
  const res = await axios.get<Fixture[]>(
    `https://apis.tisini.co.ke/apiagent11.php?fixture=all&fixtype=${fixType}&gamedate=${matchDay}`
  );

  return res.data;
};
