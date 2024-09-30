import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import MainHeader from "@/components/MainHeader";

import { ArticleInterface } from "@/lib/types";
import FeaturedSection from "./FeaturedSection";
// import MainFooter from "@/components/MainFooter";
import useAllArticles from "@/hooks/useAllArticles";
import useFeaturedArticle from "@/hooks/useFeaturedArticle";
import useCategoryArticles from "@/hooks/useCategoryArticles";
import CategoryGrid from "@/components/articles/CategoryGrid";
import SocialsWidget from "@/components/articles/SocialCategory";
import CategoryColumn from "@/components/articles/CategoryColumn";
import HomePageLoadingComponent from "../Homepage/HomePageLoadingComponent";

export const BlogPage = () => {
  const {
    data: categoryData,
    isLoading: categoryLoading,
    refreshData: refreshCategoryData,
  } = useCategoryArticles();
  const {
    data: articlesData,
    isLoading: articlesLoading,
    refreshData: refreshArticlesData,
  } = useAllArticles();
  const {
    data: featuredData,
    isLoading: featuredLoading,
    refreshData: refreshFeaturedData,
  } = useFeaturedArticle();

  // Fetch all data on component mount
  useEffect(() => {
    refreshCategoryData(); // Fetch category articles
    refreshArticlesData(); // Fetch all articles
    refreshFeaturedData(); // Fetch featured articles
  }, []);

  // Combine loading states
  const isLoading = categoryLoading || articlesLoading || featuredLoading;

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

  const lowdown = categoryData.filter(
    (category) => category.article_category === "Lowdown"
  );

  const features = categoryData.filter(
    (category) => category.article_category === "Features"
  );

  if (isLoading) {
    return <HomePageLoadingComponent />;
  }

  if (!footballCategory[0]) {
    return <div>"No football articles"</div>;
  }

  return (
    <main className="container mx-auto">
      <ToastContainer />

      {/* Hero Section */}
      <FeaturedSection
        article={featuredData as ArticleInterface}
        recentPosts={recentArticles}
      />

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
              category="Lowdown"
              articles={lowdown[0].articles as ArticleInterface[]}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
