/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { ToastContainer } from "react-toastify";

import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import React from "react";
import CategoryArticle from "@/components/articles/CategoryArticle";
import useCategoryArticles from "@/hooks/useCategoryArticles";

export default function Homepage() {
  const d1 = useCategoryArticles()
  // const dispatch = useAppDispatch();
  // const { articles } = useAppSelector((state) => state.articles);
  // const fetchArticles = async () => {
  //   dispatch(articlesLoadStart());
  //   try {
  //     const response = (await (
  //       // https://system.tisini.co.ke/blogs/category_articles/
  //       // await tisiniAxios.get("/blogs/articles/?limit=5&page=1")
  //       await tisiniAxios.get("/blogs/category_articles")
  //     ).data) as PaginatedResponse<ArticleInterface>;

  //     dispatch(articlesLoadSuccess(response));
  //   } catch (err) {
  //     // console.log(err);
  //     if (err instanceof AxiosError) {
  //       const { detail } = err.response?.data;
  //       toast.error(detail as string);
  //       dispatch(articlesLoadFailure(JSON.stringify(err)));
  //     }
  //   } finally {
  //     dispatch(articlesSettle());
  //   }
  // };
  // const fetchSponsoredArticles = async () => {
  //   dispatch(sponsoredArticlesLoadStart());
  //   try {
  //     const response = (await (
  //       await tisiniAxios.get("/blogs/articles_sponsored/")
  //     ).data) as Array<ArticleInterface>;

  //     dispatch(sponsoredArticlesLoadSuccess(response));
  //   } catch (err) {
  //     dispatch(sponsoredArticlesLoadFailure(JSON.stringify(err)));
  //   } finally {
  //     dispatch(sponsoredArticlesSettle());
  //   }
  // };
  // React.useEffect(() => {
  //   Promise.allSettled([
  //     fetchSponsoredArticles(),
  //     fetchSponsoredArticles(),
  //   ]).catch(() => {
  //     // console.log(err)
  //   });
  // }, []);
  // React.useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   Promise.allSettled([fetchArticles()]).catch(() => {
  //     // console.log(err);
  //   });
  // }, []);
  // // const handleLoadMore = async () => {
  // // };
  // // console.log(data);
  // const articlesLength = React.useMemo(() => {
  //   return articles.results.length;
  // }, [articles]);
  // const featuredArticle = React.useMemo(() => {
  //   return articles.results.filter((article) => article.is_featured)[0];
  // }, [articles]);

  // const random4Articles = React.useMemo(() => {
  //   return articles.results
  //     .filter((article) => !article.is_featured)
  //     .sort(() => Math.random() - Math.random())
  //     .slice(0, 4);
  // }, [articles]);

  return (
    <main className="">
      <MainHeader />
      <ToastContainer />
      <CategoryArticle posts={d1.data}/>
      {/* {loading && <Loader isLoading={loading} />} */}
      {/* {articlesLength > 0 ? (
        <div className="">
          
          <HomeBannerArticles
            featured_article={featuredArticle}
            headline_articles={random4Articles}
            spotlight_articles={random4Articles}
          />
        </div>
      ) : (
        <HomePageLoadingComponent />
      )} */}
      <MainFooter />
    </main>
  );
}
