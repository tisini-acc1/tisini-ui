import axios from "axios";
import { BallScorer, TopScorer } from "../types/leagues";

export const fetchScorers = async (season: string) => {
  // const url = import.meta.env.VITE_API_SCORES_URL;
  // const token = import.meta.env.VITE_API_TOKEN;
  const url = "https://apis.tisini.co.ke/api51.php";
  const token = "22855bc4eb3066caa6ebd0d332ea5426a7";

  try {
    const res = await axios.post<TopScorer[]>(`${url}?gettoken=${token}`, {
      action: "topPointRefData",
      fixturetype: "rugby7",
      seriesid: season,
    });

    // console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch league scorers, ${error.message}`);
  }
};

const fetchSeasonScorers = async (season: string, type: string) => {
  // const url = import.meta.env.VITE_API_SCORES_URL;
  // const token = import.meta.env.VITE_API_TOKEN;
  const url = "https://apis.tisini.co.ke/api51.php";
  const token = "22855bc4eb3066caa6ebd0d332ea5426a7";

  try {
    const res = await axios.post<TopScorer[] | BallScorer[]>(
      `${url}?gettoken=${token}`,
      {
        action: "topPointRefData",
        fixturetype: type,
        seriesid: season,
      }
    );

    // console.log(res);
    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch league scorers, ${error.message}`);
  }
};

export default fetchSeasonScorers;
