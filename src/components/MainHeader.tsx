import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { LucideMenu } from "lucide-react";

import React from "react";
// import SponsoredHeaderArticles from "./SponsoredHeaderArticles";
import { logoutUser } from "@/store/slices/auth.slice";
import MaxWidthWrapper from "./max-width-wrapper";
import { cn } from "@/lib/cn";

export default function MainHeader() {
  const authLinks = {
    authenticated: [],
    unauthenticated: [
      {
        title: "Sign in",
        href: "/auth/login",
      },
      // {
      //   title: "Sign up",
      //   href: "/auth/register",
      // },
    ],
  };

  const generalLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Live scores",
      href: "/scores",
    },
    {
      title: "Tano Bora",
      href: "/tanobora",
    },
    {
      title: "Quiz",
      href: "/quiz",
    },
  ];

  const { auth } = useAppSelector((state) => state.persist);
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  // const defaultAvatar =
  //   "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";

  return (
    
    <div className="border-b p-4 text-2xl sticky top-0 bg-white z-[500]">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <Link to={"/"} className="h-12">
              <img
                src="/src/assets/img/TISINI-transparent-Logo.png"
                alt=""
                className="h-full"
              />
            </Link>
            {/* <Link
              to="/"
              className="text-3xl font-extrabold text-primary ml-2 uppercase"
            >
              Tisini
            </Link> */}
          </div>
          <div className="hidden md:flex gap-4 items-center font-bold">
            {generalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-xl text-primary hover:text-primary-light transition duration-300 ease-in-out"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4 flex-row-reverse">
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                  className="text-md px-4 md:px-6 bg-red-400 hover:bg-red-500 text-light py-2 rounded-md"
                >
                  Logout
                </button>
                <div className="flex items-center">
                  <NavLink to={'/auth/profile'}
                  className='text-blue-500 hover:underline'
                  >{auth.user!.nickname}</NavLink>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {/* <Link
                  to="/auth/login"
                  className="text-primary text-md border px-4 md:px-6 py-2 rounded-md"
                >
                  Sign in
                </Link> */}
                <Link
                  to="/auth/login"
                  className="text-md px-4 md:px-6 bg-primary hover:bg-primary text-light  py-2 rounded-md"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
          <Menu className="md:hidden" as="div">
            <Menu>
              <Menu.Button>
                <LucideMenu size={32} />
              </Menu.Button>
              <Menu.Items
                className={`absolute right-0 top-16 bg-white border border-gray-200 rounded-md shadow-lg z-10 h-fit p-4 flex flex-col w-full`}
              >
                {generalLinks.map((link) => (
                  <Menu.Item key={link.href}>
                    {({ active }) => (
                      <Link
                        className={cn(
                          "text-center",
                          active ? "bg-gray-200" : "",
                          "text-lg font-semibold text-primary hover:text-primary-lighter transition duration-300 ease-in-out py-2"
                        )}
                        to={link.href}
                      >
                        {link.title}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <hr className="my-2" />
                {auth.isAuthenticated ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4 flex-col-reverse ">
                      <button
                        onClick={() => {
                          dispatch(logoutUser());
                        }}
                        className="text-md px-4 text-center bg-red-400 hover:bg-red-500 text-light py-2 rounded-md w-full"
                      >
                        Logout
                      </button>

                      {/* Username */}
                      <div className="flex items-center">
                        <NavLink to={'/auth/profile'}>{auth.user!.nickname}</NavLink>
                        {/* <img
                          className="w-8 h-8 rounded-full"
                          src={defaultAvatar}
                          alt="avatar"
                        /> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {authLinks.unauthenticated.map((link) => (
                      <Menu.Item key={link.href}>
                        {({ active }) => (
                          <Link
                            className={cn(
                              "w-full border text-center rounded",
                              active ? "bg-gray-100" : "",
                              "text-lg font-semibold  transition duration-300 ease-in-out py-2",

                              link.href === "/auth/login"
                                ? "bg-primary text-light"
                                : ""
                            )}
                            to={link.href}
                          >
                            {link.title}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                )}
              </Menu.Items>
            </Menu>
          </Menu>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
