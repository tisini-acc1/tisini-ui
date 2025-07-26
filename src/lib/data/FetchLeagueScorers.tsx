import axios from "axios";
import { TopScorer } from "../types/leagues";

const fetchSeasonScorers = async () => {
  const url = import.meta.env.VITE_API_SCORES_URL;
  const token = import.meta.env.VITE_API_TOKEN;

  try {
    const res = await axios.post<TopScorer[]>(`${url}?gettoken=${token}`, {
      action: "topPointRefData",
      fixturetype: "rugby7",
      seriesid: 103,
    });

    // console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch league scorers, ${error.message}`);
  }
};

export default fetchSeasonScorers;
