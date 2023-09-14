/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @author Felix Orinda
 * @email forinda82@gmail.com
 * @create date 2023-07-06 23:47:00
 * @modify date 2023-07-06 23:47:00
 * @desc [Application header]
 */

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Link } from "react-router-dom";
import React from "react";
import SponsoredHeaderArticles from "./SponsoredHeaderArticles";
import { logoutUser } from "@/store/slices/auth.slice";

export default function MainHeader() {
  const { auth } = useAppSelector((state) => state.persist);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const defaultAvatar =
    "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";

  return (
    <header className="bg-primary w-full">
      {/* Mobile */}
      <div className="items-center p-4 md:hidden">
        <div className="flex items-center justify-between border-b py-2">
          <div className="flex items-center">
            {/* <img className="h-8 w-8" src="/images/logo.png" alt="logo" /> */}
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            <span className="text-white font-bold text-xl ml-2">Tisini</span>
          </div>
          <div className="flex items-center">
            {auth.isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-white font-bold text-xl ml-2">
                  {auth?.user?.nickname}
                </span>
                <img
                  className="h-8 w-8 rounded-full ml-2"
                  src={defaultAvatar}
                  alt="avatar"
                />
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-white font-bold text-xl ml-2">Login</span>
                <img
                  className="h-8 w-8 rounded-full ml-2"
                  src={defaultAvatar}
                  alt="avatar"
                />
              </div>
            )}
          </div>
        </div>
        <div>
          {isMenuOpen && (
            <div className="absolute left-0 z-10 flex flex-col items-center w-full h-fit bg-primary py-2">
              <div className="flex flex-col items-center whitespace-nowrap">
                <Link to="/" className="text-white hover:underline text-xl">
                  Home
                </Link>
                <a href="https://tisiniscores.netlify.app/" target="_blank" className="text-white  hover:underline text-xl">
                  Live scores
                </a>
                <Link
                  to="/organizations"
                  className="text-white hover:underline text-xl"
                >
                  Quiz
                </Link>
              </div>
              {auth.isAuthenticated ? (
                <div>
                  <div className="flex items-center py-2">
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                      className="text-white text-xl bg-red-500 py-1 px-2 rounded-md focus:outline-none"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full h-fit bg-primary py-2">
                  <div className="flex items-center justify-center">
                    <Link
                      to="/auth/login?tab=register"
                      className="text-white text-xl bg-primary-lighter py-1 px-2 rounded-md focus:outline-none"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/auth/login?tab=login"
                      className="text-white text-xl border-white border py-1 px-2 rounded-md focus:outline-none"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tablet */}
      {/* <div className="hidden md:flex justify-between items-center p-4">
        <div className="flex items-center">
          <img className="h-8 w-8" src="/images/logo.png" alt="logo" />
          <span className="text-white font-bold text-xl ml-2">Felix</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-white font-bold text-xl ml-2">
              {auth?.user?.nickname} ss
            </span>
            <img
              className="h-8 w-8 rounded-full ml-2"
              src="/images/avatar.png"
              alt="avatar"
            />
          </div>
        </div>
      </div> */}

      {/* Desktop */}
      <div className="hidden md:flex flex-col py-2 max-w-7xl mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <Link to="/" className="text-white font-medium text-xl uppercase">
              Tisini
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <a href="https://tisiniscores.netlify.app" target="_blank" className="text-white whitespace-nowrap font-bold text-md">
                Live scores
              </a>
              <Link
                to="/organizations"
                className="text-white font-bold text-md"
              >
                Quiz
              </Link>
            </div>
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <button
                    className="text-white text-md bg-red-500 px-2 rounded-md focus:outline-none"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full h-fit bg-primary py-2">
                <div className="flex items-center justify-center gap-2">
                  <Link
                    to="/auth/login?tab=register"
                    className="text-white font-bold text-md bg-primary-lighter py-1 px-2 rounded-md focus:outline-none"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/auth/login?tab=login"
                    className="text-white font-bold text-md border-white border py-1 px-2 rounded-md focus:outline-none"
                  >
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="my-2"/>
        <SponsoredHeaderArticles/>
      </div>
    </header>
  );
}
