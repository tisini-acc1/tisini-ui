import { tisiniAxios } from "@/lib/api";

const FetchCategoryArticles = async () => {
  const res = await tisiniAxios.get("/blogs/category_articles");

  return res.data.results;
};

export default FetchCategoryArticles;
