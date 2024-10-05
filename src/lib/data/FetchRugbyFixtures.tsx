import axios from "axios";
import { Fixture } from "../types/scores";

const FetchRugbyFixtures = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent7.php?fixture=all&fixtype=rugby15"
  );

  return res.data;
};

export default FetchRugbyFixtures;
