import axios from "axios";
import { Fixture } from "../types/leagues";

const fetchSeasonFixtures = async () => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post<Fixture[]>(`${url}?gettoken=${token}`, {
      action: "fixtures",
      seasonid: 87,
    });

    console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch leagues, ${error.message}`);
  }
};

export default fetchSeasonFixtures;
