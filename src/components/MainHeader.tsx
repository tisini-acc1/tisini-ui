/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Felix Orinda
 * @email forinda82@gmail.com
 * @create date 2023-07-06 23:47:00
 * @modify date 2023-07-06 23:47:00
 * @desc [Application header]
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";
import SponsoredHeaderArticles from "./SponsoredHeaderArticles";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { tisiniAxios } from "@/lib/api";
import useAuth from "@/hooks/useAuth";

export default function MainHeader() {
  const { auth, dispatch } = useAuth();
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
    Promise.allSettled([fetchSponsoredArticles()]).catch((err: any) => {
      // console.log(err)
    });
  }, []);
  return (
    <header className="bg-primary w-full">
      <div className="max-w-7xl mx-auto p-4 w-full">
        <div className="flex flex-col gap-2">
          {/* Layer 1 */}
          <div className="w-full flex items-center justify-between">
            <div className="flex  items-center gap-2">
              {/* <FontAwesomeIcon
                icon={faBars}
                className={`text-white hover:text-gray-400 font-bold w-6 h-6`}
              /> */}
              <h1 className="text-white font-bold text-2xl">Tisini</h1>
              {/* vertical line */}
              <div className="w-0.5 h-6 bg-white mx-2"></div>

              <div>
                <nav>
                  <ul className="flex flex-row gap-4 items-center">
                    <li>
                      <Link
                        to="/"
                        className="text-white hover:text-gray-400 font-bold"
                      >
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/"
                        className="text-white hover:text-gray-400 font-bold"
                      >
                        Livescore
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/organizations"
                        className="text-white hover:text-gray-400 font-bold"
                      >
                        Quiz
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  {auth.user?.nickname}
                </Link>

                <button
                  className="bg-red-300 text-primary rounded-md px-4"
                  onClick={() => {
                    dispatch({ type: "auth/LOGOUT" });
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="px-2 flex gap-2 items-center">
                <Link
                  to="/auth/login"
                  className="text-white hover:text-gray-400 font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="text-primary hover:text-primary-lighter font-bold bg-white px-4 py-1 rounded-md"
                >
                  Sign Up
                </Link>
                <button>
                  <FontAwesomeIcon icon={faSearch} className="text-white" />
                </button>
              </div>
            )}
          </div>
          <hr className="bg-white" />
          {/* Layer 2 */}
          <SponsoredHeaderArticles />
        </div>
      </div>
    </header>
  );
}
