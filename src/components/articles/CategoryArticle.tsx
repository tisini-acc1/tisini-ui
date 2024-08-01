import { cn } from "@/lib/cn";
import { CategoriesWithPostType } from "@/lib/types";
import React from "react";
import { NavLink } from "react-router-dom";

type ComponentProps = {
  posts: CategoriesWithPostType[];
};

export default function CategoryArticle({ posts }: ComponentProps) {
  return (
    <div className="flex flex-col gap-8  p-4">
      {posts
        .filter((p) => p.articles.length > 0)
        .map((category, index) => (
          <div
            className={cn({
              "bg-gray-100": index % 2 == 0,
            })}
          >
            <div className={cn("flex flex-col gap-4 mx-auto max-w-7xl p-8")}>
              <div>
                <h1 className="text-4xl  italic font-bold underline">
                  {category.article_category}
                </h1>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2">
                {category.articles.map((article) => (
                  <NavLink
                    to={`/articles/${article.slug}/single-read`}
                    className="text-lg font-semibold text-primary  max-w-[32rem]"
                  >
                    <div className="h-80">
                      <img
                        src={article.featured_image_url}
                        alt=""
                        className="h-full w-full"
                      />
                    </div>
                    <div className="p-4">
                      <h1 className="font-semibold">{article.article_title}</h1>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
