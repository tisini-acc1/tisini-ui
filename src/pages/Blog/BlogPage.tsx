import { ToastContainer } from "react-toastify";
// import MainHeader from "@/components/MainHeader";

import FeaturedSection from "./FeaturedSection";
// import MainFooter from "@/components/MainFooter";
// import useCategoryArticles from "@/hooks/useCategoryArticles";
import CategoryGrid from "@/components/articles/CategoryGrid";
import SocialsWidget from "@/components/articles/SocialCategory";
import CategoryColumn from "@/components/articles/CategoryColumn";

export const BlogPage = () => {
  // const d1 = useCategoryArticles();

  return (
    <main className="container mx-auto">
      <ToastContainer />

      {/* Hero Section */}
      <FeaturedSection />

      {/* Articles Section with adverts */}
      <section className="p-7 bg-gray-100">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[4] w-full">
            <CategoryGrid />
          </div>

          <div className="flex-[4] w-full">
            <CategoryColumn />
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
            <CategoryColumn />
          </div>

          <div className="flex-1 w-full">
            <CategoryGrid />
          </div>

          <div className="flex-1 w-full">
            <CategoryColumn />
          </div>
        </div>
      </section>
    </main>
  );
};
