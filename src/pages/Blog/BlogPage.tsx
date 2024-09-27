import MainHeader from "@/components/MainHeader";

import { ToastContainer } from "react-toastify";
import CategoryGrid from "@/components/articles/CategoryGrid";
import CategoryColumn from "@/components/articles/CategoryColumn";
import SocialsWidget from "@/components/articles/SocialCategory";
import MainFooter from "@/components/MainFooter";
import FeaturedSection from "./FeaturedSection";

export const BlogPage = () => {
  return (
    <main className="container mx-auto">
      <MainHeader />
      <ToastContainer />

      {/* Hero Section */}
      <FeaturedSection />

      {/* Articles Section with adverts */}
      <section className="p-7 bg-gray-100">
        <div className="grid grid-cols-11 gap-6">
          <div className="col-span-4 w-full">
            <CategoryGrid />
          </div>

          <div className="col-span-4 w-full">
            <CategoryColumn />
          </div>

          <div className="col-span-3">
            <SocialsWidget />
          </div>
        </div>
      </section>

      {/* Second Articles Section */}
      <section className="p-7 ">
        <div className="flex sm:flex-row gap-6">
          <div className="flex-1 w-full">
            <CategoryGrid />
          </div>

          <div className="flex-1 w-full">
            <CategoryColumn />
          </div>

          <div className="flex-1 w-full">
            <CategoryGrid />
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
};
