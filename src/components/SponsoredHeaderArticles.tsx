import { NavLink } from "react-router-dom";
import useAppState from "@/hooks/useAppState";

export default function SponsoredHeaderArticles() {
  const {
    sponsoredArticles: { articles, loading },
  } = useAppState();
  return !loading && articles.length > 0 ? (
    <div className="flex gap-2">
      {articles.map((article) => (
        <NavLink
          to={`/articles/${article.slug}/single-read`}
          className="flex gap-2 hover:text-blue-500"
          key={article.article_title}
        >
          <img
            src={article.thumbnail!}
            alt="logo"
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
          <span className="text-neutral-200 text-sm truncate">
            {article.article_title.slice(0, 30) + "..."}
          </span>
        </NavLink>
      ))}
    </div>
  ) : !loading && articles.length === 0 ? (
    <>Loading....</>
  ) : null;
}
