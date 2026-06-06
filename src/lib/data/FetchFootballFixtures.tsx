import axios from "axios";
import { Fixture, NewFixture } from "../types/scores";

const fetchFootballFixtures = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=football",
  );

  return res.data;
};

export default fetchFootballFixtures;

export const matchDayFixtures = async (fixType: string, matchDay: string) => {
  const res = await axios.get<Fixture[]>(
    `https://apis.tisini.co.ke/apiagent11.php?fixture=all&fixtype=${fixType}&gamedate=${matchDay}`,
  );

  return res.data;
};

export const fetchNewFootballFixtures = async (
  fixType: string,
  matchDay: string,
) => {
  const url = import.meta.env.VITE_API_DJANGO_API;
  const apiKey = import.meta.env.VITE_API_KEY;

  const res = await axios.get<NewFixture[]>(
    `${url}/scores/matches-by-date/${matchDay}?fixture_type=${fixType}&new=true`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
    },
  );

  return res.data;
};
