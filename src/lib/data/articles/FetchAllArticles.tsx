import { tisiniAxios } from "@/lib/api";
// import { ArticleInterface } from "@/lib/types";

const FetchAllArticles = async () => {
  const res = await tisiniAxios.get("/blogs/articles/");
  //    await axios.get<ArticleInterface[]>(
  //     `https://apis.tisini.co.ke/apiagent7.php?event=${fixtureId}`
  //   );
  return res.data;
};

export default FetchAllArticles;
