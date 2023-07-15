/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { ArticleInterface, PaginatedResponse } from "@/lib/types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomePageLoadingComponent from "./HomePageLoadingComponent";
import MainFooter from "@/components/MainFooter";
import MainHeader from "@/components/MainHeader";
import React from "react";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { stripHtmlTags } from "@/lib/services/strip-htmltags";
import { tisiniAxios } from "@/lib/api";
import useAppState from "@/hooks/useAppState";

export default function Homepage() {
  const fetchArticles = async () => {
    dispatch({ type: "articles/LOAD_START" });
    try {
      const response: PaginatedResponse<ArticleInterface> = await (
        await tisiniAxios.get("/blogs/articles/?limit=5&page=1")
      ).data;
      // console.log({ response });

      dispatch({ type: "articles/LOAD_SUCCESS", payload: response });
    } catch (err) {
      // console.log(err);
      if (err instanceof AxiosError) {
        const { detail } = err.response?.data;
        dispatch({ type: "articles/LOAD_FAILURE", payload: detail });
        toast.error(error);
      }
    } finally {
      dispatch({ type: "articles/SETTLE" });
    }
  };
  const {
    dispatch,
    articles: { articles, error },
  } = useAppState();
  const fetchSponsoredArticles = async () => {
    dispatch({ type: "sponsored-articles/LOAD_START" });
    try {
      const response = await (
        await tisiniAxios.get("/blogs/articles_sponsored/")
      ).data;
      // console.log({ response });

      dispatch({ type: "sponsored-articles/LOAD_SUCCESS", payload: response });
    } catch (err) {
      // console.log({err});
      dispatch({
        type: "sponsored-articles/LOAD_FAILURE",
        payload: JSON.stringify(err),
      });
    } finally {
      dispatch({ type: "sponsored-articles/SETTLE" });
    }
  };
  React.useEffect(() => {
    Promise.allSettled([fetchSponsoredArticles(),fetchSponsoredArticles()]).catch((err: any) => {
      // console.log(err)
    });
  }, []);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled([fetchArticles()]).catch(() => {
      // console.log(err);
    });
  }, []);
  // const handleLoadMore = async () => {
  // };
  const navigate = useNavigate();
  // console.log(data);
  const articlesLength = React.useMemo(() => {
    return articles.results.length;
  }, [articles]);
  const featuredArticle = React.useMemo(() => {
    return articles.results.filter((article) => article.is_featured)[0];
  }, [articles]);

  const random4Articles = React.useMemo(() => {
    return articles.results
      .filter((article) => !article.is_featured)
      .sort(() => Math.random() - Math.random())
      .slice(0, 4);
  }, [articles]);

  return (
    <main className="">
      <MainHeader />
      {/* {loading && <Loader isLoading={loading} />} */}
      <ToastContainer />
      {articlesLength > 0 ? (
        <div className="flex flex-col items-center px-4 py-4 mx-auto sm:justify-between sm:py-6 md:px-8 lg:px-16 max-w-7xl">
          {/* Hero section */}
          <div className="flex flex-col items-center justify-center w-full h-full py-8"></div>
          {/* Header section */}
          <div
          onClick={() => navigate(`/articles/${featuredArticle.slug}/single-read`)}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div className="flex flex-col h-full">
              <div className="h-64">
                <img
                  src={featuredArticle?.featured_image!}
                  alt="hero"
                  className=" inset-0 object-cover w-full h-full"
                />
              </div>
              <div className="px-4 py-2">
                <h1 className="text-lg font-bold text-primary">
                  {/* Sergio Rico was trampled by a horse. This is the incredible
                story of how he cheated death Sergio Rico was trampled by a
                horse. This is the incredible story of how he cheated death */}
                  {stripHtmlTags(featuredArticle?.article_title)}
                </h1>
                <p>
                  {/* After winning Ligue 1, Sergio Rico travelled to El Rocio for a
                religious festival – where a tragic accident left him fighting
                for his life */}
                  {stripHtmlTags(
                    featuredArticle?.excerpt ? featuredArticle?.excerpt : ""
                  )}
                </p>
                <div className="flex items-center gap-2 py-2">
                  <div>
                    {featuredArticle?.author.first_name +
                      " " +
                      featuredArticle?.author.last_name}
                  </div>
                  <div className="flex items-center relative">
                    <FontAwesomeIcon icon={faMessage} />
                    <span className="text-sm font-bold text-primary absolute top-1 -right-5 border rounded-full w-5 h-5 flex items-center justify-center">
                      {/* 2 */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Col 2 */}
            <div className="flex flex-col gap-2">
              {random4Articles.map((article) => (
                <div
                  key={article.id}
                  className="border-b grid grid-cols-[2fr_1fr] gap-2 p-2"
                >
                  <div className="relative ">
                    <Link to={`/articles/${article.slug}/single-read`}
                    className="text-sm font-semibold font-roboto text-primary hover:text-blue-600 hover:underline">
                      {/* How Guler fits in to Real Madrids team - and their
                    youth-first transfer policy Guillermo Rai68 How Guler fits
                    in to Real Madrids team - and their youth-first transfer
                    policy */}
                      {article.article_title}
                    </Link>
                    <hr />
                    <div className="flex items-center gap-2 text-sm">
                      <div>
                        {article.author.first_name +
                          " " +
                          article.author.last_name}
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faMessage} />
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-24">
                    <img
                      src={article.featured_image!}
                      alt="hero"
                      className="inset-0 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Col 3 */}
            <div className="p-2 border-l">
              <div className="flex justify-between">
                <h1 className="text-lg font-bold text-primary">Headlines</h1>
                <button className="text-sm font-semibold text-primary">
                  See all
                </button>
              </div>
              <hr />
              <ul className="flex flex-col gap-4 ml-2 px-2">
                {articles.results.map((_, i) => (
                  <li key={i * 10} className="list-disc">
                    {/* PSG give Mbappe deadline for decision on future in
                    three-page letter */}
                    <NavLink
                      to={`/articles/${_.slug}/single-read`}
                      className="text-sm font-semibold text-primary hover:text-blue-600 hover:underline"
                    >
                      {_.article_title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <hr className=" w-full my-4 border-t border-gray-300 sm:block" /> */}
          {/* Spotlight */}
          {/* <div className="flex flex-col justify-center w-full h-full">
            <div className="py-4 text-left">
              <h1 className="text-lg font-bold text-primary">Spotlight</h1>
            </div>
            <div className="grid  p-2 md:grid-cols-2">
              <div>
                <div className="h-1/2">
                  <img
                    src="/player.jpg"
                    alt="hero"
                    className=" inset-0 object-cover w-full h-full"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="px-4 py-2">
                  <h1 className="text-lg font-bold text-primary">
                    Sergio Rico was trampled by a horse. This is the incredible
                    story of how he cheated death Sergio Rico was trampled by a
                    horse. This is the incredible story of how he cheated death
                  </h1>
                  <p>
                    After winning Ligue 1, Sergio Rico travelled to El Rocio for
                    a religious festival – where a tragic accident left him
                    fighting for his life
                  </p>
                  <div className="flex items-center gap-2 py-2">
                    <div>Brian Omondi</div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faMessage} />
                      <span>2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i * 30}
                      className="border-b grid grid-cols-[1fr_2fr] gap-2 p-2"
                    >
                      <div className="">
                        <img
                          src="/p2.jpg"
                          alt="hero"
                          className="inset-0 object-cover"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="relative ">
                        <h1 className="text-sm font-semibold font-roboto text-primary">
                          How Guler fits in to Real Madrids team - and their
                          youth-first transfer policy Guillermo Rai68 How Guler
                          fits in to Real Madrids team - and their youth-first
                          transfer policy
                        </h1>
                        <hr />
                        <div className="flex items-center gap-2 text-sm">
                          <div>Brian Omondi</div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMessage} />
                            <span>2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}

          {/* <hr className=" w-full my-4 border-t border-gray-300 sm:block" /> */}
          {/* Club deals */}
          {/* <div className="flex flex-col justify-center w-full h-full">
            <div className="py-4 text-left">
              <h1 className="text-lg font-bold text-primary">Club deals</h1>
            </div>
            <div className="grid  p-2 md:grid-cols-2">
              <div>
                <div className="h-1/2">
                  <img
                    src="/player.jpg"
                    alt="hero"
                    className=" inset-0 object-cover w-full h-full"
                    width={500}
                    height={500}
                  />
                </div>
                <div className="px-4 py-2">
                  <h1 className="text-lg font-bold text-primary">
                    Sergio Rico was trampled by a horse. This is the incredible
                    story of how he cheated death Sergio Rico was trampled by a
                    horse. This is the incredible story of how he cheated death
                  </h1>
                  <p>
                    After winning Ligue 1, Sergio Rico travelled to El Rocio for
                    a religious festival – where a tragic accident left him
                    fighting for his life
                  </p>
                  <div className="flex items-center gap-2 py-2">
                    <div>Brian Omondi</div>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faMessage} />
                      <span>2</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i * 40}
                      className="border-b grid grid-cols-[1fr_2fr] gap-2 p-2"
                    >
                      <div className="">
                        <img
                          src="/p2.jpg"
                          alt="hero"
                          className="inset-0 object-cover"
                          width={500}
                          height={500}
                        />
                      </div>
                      <div className="relative ">
                        <h1 className="text-sm font-semibold font-roboto text-primary">
                          How Guler fits in to Real Madrids team - and their
                          youth-first transfer policy Guillermo Rai68 How Guler
                          fits in to Real Madrids team - and their youth-first
                          transfer policy
                        </h1>
                        <hr />
                        <div className="flex items-center gap-2 text-sm">
                          <div>Brian Omondi</div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMessage} />
                            <span>2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        // <div className="flex items-center justify-center h-screen">
        //   <div className="flex flex-col items-center justify-center gap-2">
        //     <div className="text-4xl font-bold text-primary">404</div>
        //     <div className="text-xl font-semibold text-primary">
        //       Page not found
        //     </div>
        //   </div>
        // </div>
        <HomePageLoadingComponent />
      )}
      <MainFooter />
    </main>
  );
}
