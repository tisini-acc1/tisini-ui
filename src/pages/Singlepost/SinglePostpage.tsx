import { ArticleInterface } from "@/lib/types";
import HtmlDecoder from "@/components/HtmlDecode";
import Loader from "@/components/Loader/Loader";
import React from "react";
import { tisiniAxios } from "@/lib/api";
import { useParams } from "react-router-dom";

// const _defaultImage ='https://picsum.photos/500/500'
export default function SinglePostpage() {
  const slug  = useParams<{ slug: string }>().slug as string;
  const [post, setPost] = React.useState<ArticleInterface | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = (await tisiniAxios(`/blogs/articles/${slug}`))
        .data as ArticleInterface;
      setPost(res);
    } catch (error) {
    //   console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    Promise.allSettled([fetchPost()]).catch((error) => console.log(error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div className="min-h-[50vh]">
      {loading && <Loader isLoading={loading} />}
      <div className="max-w-2xl mx-auto py-2 flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold
          max-w-2xl mx-auto text-gray-800
          ">{post?.article_title}</h1>
        </div>
        <img
          src={post?.featured_image ?? ""}
          alt="logo"
          className="rounded max-h-96"
        />
        <div>
          <div className="flex items-center gap-4 py-2 border-b px-2 my-1">
            <span className="text-primary text-sm truncate">
              <strong>Author:</strong> {post?.author.first_name}{" "}
              {post?.author.last_name}
            </span>
            <span className="text-primary text-sm truncate">
              {new Date(post?.publish ?? "").toDateString()}
            </span>
          </div>
          <div>
            {HtmlDecoder({ html: post?.article_body ?? "", exerpt: false })}
          </div>
        </div>
      </div>
    </div>
  );
}
