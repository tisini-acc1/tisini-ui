import axios from "axios";

const FetchFixtureById = async (fixtureId: string) => {
  const data = await axios.get(
    `https://apis.tisini.co.ke/apiagent2.php?event=${fixtureId}`
  );

  return data;
};

export default FetchFixtureById;
