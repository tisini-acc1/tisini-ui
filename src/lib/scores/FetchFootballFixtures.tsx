import axios from "axios";
import { Fixture } from "../types/scores";

const fetchFootballFixtures = async () => {
  const res = await axios.get<Fixture[]>(
    "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=football"
  );

  return res.data;
};

export default fetchFootballFixtures;

// const fetchFootballFixtures = async (): Promise<Fixture[]> => {
//   const data: AxiosResponse<Fixture[]> = await axios.get(
//     "https://apis.tisini.co.ke/apiagent2.php?fixture=all&fixtype=football"
//   );

//   return data;
// };

// export default fetchFootballFixtures;
