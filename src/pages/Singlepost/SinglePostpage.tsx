import { ArticleInterface } from "@/lib/types";
import HtmlDecoder from "@/components/HtmlDecode";
import Loader from "@/components/Loader/Loader";
import React from "react";
import { tisiniAxios } from "@/lib/api";
import { useParams } from "react-router-dom";
import './style.css'
import MaxWidthWrapper from "@/components/max-width-wrapper";

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
      <MaxWidthWrapper className=" py-2 flex flex-col gap-2 px-2 max-w-6xl">
        
        <img
          src={post?.featured_image_url ?? ""}
          alt="logo"
          className="rounded max-h-96 mx-auto"
        />
        <div className="text-left">
          <h1 className="text-2xl font-bold
           mx-auto text-gray-800
          ">{post?.article_title}</h1>
        </div>
        <div>
          <div className="flex items-center gap-4 py-2 border-b px-2 my-1">
            <span className="text-primary truncate text-lg">
              <strong>Author:</strong> {post?.author.first_name}{" "}
              {post?.author.last_name}
            </span>
            <span className="text-primary text-lg truncate">
              {new Date(post?.publish ?? "").toDateString()}
            </span>
          </div>
          <div className="text-xl">
            {HtmlDecoder({ html: post?.article_body ?? "", exerpt: false })}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
