import { ToastContainer } from "react-toastify";
import MainHeader from "@/components/MainHeader";

import { ArticleInterface, CategoriesWithPostType } from "@/lib/types";
import FeaturedSection from "./FeaturedSection";
import MainFooter from "@/components/MainFooter";
import CategoryGrid from "@/components/articles/CategoryGrid";
import SocialsWidget from "@/components/articles/SocialCategory";
import CategoryColumn from "@/components/articles/CategoryColumn";
import HomePageLoadingComponent from "../Homepage/HomePageLoadingComponent";
import { useQuery } from "@tanstack/react-query";
import FetchAllArticles from "@/lib/data/articles/FetchAllArticles";
import FetchFeaturedArticle from "@/lib/data/articles/FetchFeaturedArticle";
import FetchCategoryArticles from "@/lib/data/articles/FetchCategoryArticles";
import { Link } from "react-router-dom";

export const BlogPage = () => {
  const { data: articlesData, isLoading: articlesLoading } = useQuery<
    ArticleInterface[],
    Error
  >(["All Articles"], FetchAllArticles);

  const { data: featuredData, isLoading: featuredLoading } =
    useQuery<ArticleInterface>(["Featured Article"], FetchFeaturedArticle);

  const { data: categoryData, isLoading: categoryLoading } = useQuery<
    CategoriesWithPostType[]
  >(["Category Articles"], FetchCategoryArticles);

  // Combine loading states
  const isLoading = categoryLoading || articlesLoading || featuredLoading;

  if (isLoading) {
    return <HomePageLoadingComponent />;
  }

  if (!articlesData || !categoryData || !featuredData) {
    return <div>"No football articles"</div>;
  }

  const recentArticles = articlesData.filter(
    (category) => category.is_featured === false
  );

  const footballCategory = categoryData.filter(
    (category) => category.article_category === "Football"
  );

  const rugbyCategory = categoryData.filter(
    (category) => category.article_category === "Rugby"
  );

  const matchRecaps = categoryData.filter(
    (category) => category.article_category === "Match Recap"
  );

  const statsRecap = categoryData.filter(
    (category) => category.article_category === "Stats Recap"
  );

  const features = categoryData.filter(
    (category) => category.article_category === "Features"
  );

  return (
    <main className="container mx-auto">
      <MainHeader />
      <ToastContainer />

      {/* Hero Section */}
      <FeaturedSection
        article={featuredData as ArticleInterface}
        recentPosts={recentArticles}
      />

      {/* <div className="mx-auto my-3 md:hidden">
        <img src="https://i.postimg.cc/GhzxYdYq/tanobora.jpg" alt="" />
      </div> */}

      {/* Articles Section with adverts */}
      <section className="p-7 bg-gray-100">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[4] w-full">
            <CategoryGrid
              category="Football"
              articles={footballCategory[0].articles as ArticleInterface[]}
            />
          </div>

          <div className="flex-[4] w-full">
            <CategoryColumn
              category="Rugby"
              articles={rugbyCategory[0].articles as ArticleInterface[]}
            />
          </div>

          <div className="flex-[3]">
            <SocialsWidget />
          </div>
        </div>
      </section>

      <Link className="w-4/5 mx-auto mt-6 hidden md:flex" to={"/tanobora"}>
        <img src="https://i.postimg.cc/GhzxYdYq/tanobora.jpg" alt="" />
      </Link>

      {/* Second Articles Section */}
      <section className="p-7 ">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 w-full">
            <CategoryColumn
              category="Match Recap"
              articles={matchRecaps[0].articles as ArticleInterface[]}
            />
          </div>

          <div className="flex-1 w-full">
            <CategoryGrid
              category="Features"
              articles={features[0].articles as ArticleInterface[]}
            />
          </div>

          <div className="flex-1 w-full">
            <CategoryColumn
              category="Stats Recap"
              articles={statsRecap[0].articles as ArticleInterface[]}
            />
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};
