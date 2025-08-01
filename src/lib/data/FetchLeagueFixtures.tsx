import axios from "axios";
import { Fixture } from "../types/leagues";

const fetchSeasonFixtures = async (season: string) => {
  // const url = import.meta.env.VITE_API_SCORES_URL ;
  // const token = import.meta.env.VITE_API_TOKEN;
  const url = "https://apis.tisini.co.ke/api48.php";
  const token = "22855bc4eb3066caa6ebd0d332ea5426a7";

  try {
    const res = await axios.post<Fixture[]>(`${url}?gettoken=${token}`, {
      action: "fixtures",
      seasonid: season,
    });

    // console.log(res);
    if (!Array.isArray(res.data)) {
      throw new Error("Invalid response format: expected an array");
    }
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch leagues, ${error.message}`);
  }
};

export default fetchSeasonFixtures;
