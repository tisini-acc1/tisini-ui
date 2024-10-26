import axios from "axios";
import { TableStandings } from "../types/scores";

const FetchStandings = async () => {
  const res = await axios.get<TableStandings>(
    `https://backend.tisini.co.ke/api/kpl_standings/`
  );

  return res.data;
};

export default FetchStandings;
