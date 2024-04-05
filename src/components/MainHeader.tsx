import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { LucideMenu } from "lucide-react";

import React from "react";
import SponsoredHeaderArticles from "./SponsoredHeaderArticles";
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
      title: "Quiz",
      href: "/organizations",
    },
  ];

  const unauthenticatedLinks = [...generalLinks, ...authLinks.unauthenticated];

  const { auth } = useAppSelector((state) => state.persist);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const defaultAvatar =
    "https://gravatar.com/avatar/cc8cbfcbd5bc4908182252d212020d52?d=mp";

  return (
    // <header className="bg-primary w-full">
    //   {/* Mobile */}
    //   <div className="items-center p-4 md:hidden">
    //     <div className="flex items-center justify-between border-b py-2">
    //       <div className="flex items-center">
    //         {/* <img className="h-8 w-8" src="/images/logo.png" alt="logo" /> */}
    //         <button
    //           className="text-white focus:outline-none"
    //           onClick={() => setIsMenuOpen(!isMenuOpen)}
    //         >
    //           <svg
    //             className="h-8 w-8"
    //             fill="none"
    //             stroke="currentColor"
    //             viewBox="0 0 24 24"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d={
    //                 isMenuOpen
    //                   ? "M6 18L18 6M6 6l12 12"
    //                   : "M4 6h16M4 12h16M4 18h16"
    //               }
    //             />
    //           </svg>
    //         </button>
    //         <span className="text-white font-bold text-xl ml-2">Tisini</span>
    //       </div>
    //       <div className="flex items-center">
    //         {auth.isAuthenticated ? (
    //           <div className="flex items-center">
    //             <span className="text-white font-bold text-xl ml-2">
    //               {auth?.user?.nickname}
    //             </span>
    //             <img
    //               className="h-8 w-8 rounded-full ml-2"
    //               src={defaultAvatar}
    //               alt="avatar"
    //             />
    //           </div>
    //         ) : (
    //           <div className="flex items-center">
    //             <span className="text-white font-bold text-xl ml-2">Login</span>
    //             <img
    //               className="h-8 w-8 rounded-full ml-2"
    //               src={defaultAvatar}
    //               alt="avatar"
    //             />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div>
    //       {isMenuOpen && (
    //         <div className="absolute left-0 z-10 flex flex-col items-center w-full h-fit bg-primary py-2">
    //           <div className="flex flex-col items-center whitespace-nowrap">
    //             <Link to="/" className="text-white hover:underline text-xl">
    //               Home
    //             </Link>
    //             <Link
    //               to="/scores"
    //               className="text-white whitespace-nowrap font-bold text-md"
    //             >
    //               Live scores
    //             </Link>
    //             <Link
    //               to="/organizations"
    //               className="text-white hover:underline text-xl"
    //             >
    //               Quiz
    //             </Link>
    //           </div>
    //           {auth.isAuthenticated ? (
    //             <div>
    //               <div className="flex items-center py-2">
    //                 <button
    //                   onClick={() => {
    //                     dispatch(logoutUser());
    //                   }}
    //                   className="text-white text-xl bg-red-500 py-1 px-2 rounded-md focus:outline-none"
    //                 >
    //                   Logout
    //                 </button>
    //               </div>
    //             </div>
    //           ) : (
    //             <div className="flex flex-col w-full h-fit bg-primary py-2">
    //               <div className="flex items-center justify-center">
    //                 <Link
    //                   to="/auth/login?tab=register"
    //                   className="text-white text-xl bg-primary-lighter py-1 px-2 rounded-md focus:outline-none"
    //                 >
    //                   Sign up
    //                 </Link>
    //                 <Link
    //                   to="/auth/login?tab=login"
    //                   className="text-white text-xl border-white border py-1 px-2 rounded-md focus:outline-none"
    //                 >
    //                   Login
    //                 </Link>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {/* Tablet */}
    //   {/* <div className="hidden md:flex justify-between items-center p-4">
    //     <div className="flex items-center">
    //       <img className="h-8 w-8" src="/images/logo.png" alt="logo" />
    //       <span className="text-white font-bold text-xl ml-2">Felix</span>
    //     </div>

    //     <div className="flex items-center">
    //       <div className="flex items-center">
    //         <span className="text-white font-bold text-xl ml-2">
    //           {auth?.user?.nickname} ss
    //         </span>
    //         <img
    //           className="h-8 w-8 rounded-full ml-2"
    //           src="/images/avatar.png"
    //           alt="avatar"
    //         />
    //       </div>
    //     </div>
    //   </div> */}

    //   {/* Desktop */}
    //   <div className="hidden md:flex flex-col py-2 max-w-7xl mx-auto">
    //     <div className="flex justify-between items-center w-full">
    //       <div className="flex items-center">
    //         <Link to="/" className="text-white font-medium text-xl uppercase">
    //           Tisini
    //         </Link>
    //       </div>
    //       <div className="flex items-center gap-4">
    //         <div className="flex items-center gap-4">
    //           <Link
    //             to="/scores"
    //             className="text-white whitespace-nowrap font-bold text-md"
    //           >
    //             Live scores
    //           </Link>
    //           <Link
    //             to="/organizations"
    //             className="text-white font-bold text-md"
    //           >
    //             Quiz
    //           </Link>
    //         </div>
    //         {auth.isAuthenticated ? (
    //           <div className="flex items-center gap-2">
    //             <div className="flex items-center">
    //               <button
    //                 className="text-white text-md bg-red-500 px-2 rounded-md focus:outline-none"
    //                 onClick={() => {
    //                   dispatch(logoutUser());
    //                 }}
    //               >
    //                 Logout
    //               </button>
    //             </div>
    //           </div>
    //         ) : (
    //           <div className="flex flex-col w-full h-fit bg-primary py-2">
    //             <div className="flex items-center justify-center gap-2">
    //               <Link
    //                 to="/auth/login?tab=register"
    //                 className="text-white font-bold text-md bg-primary-lighter py-1 px-2 rounded-md focus:outline-none"
    //               >
    //                 Sign up
    //               </Link>
    //               <Link
    //                 to="/auth/login?tab=login"
    //                 className="text-white font-bold text-md border-white border py-1 px-2 rounded-md focus:outline-none"
    //               >
    //                 Login
    //               </Link>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <hr className="my-2" />
    //     <SponsoredHeaderArticles />
    //   </div>
    // </header>
    <div className="border-b p-4 text-2xl sticky top-0 bg-white z-[500]">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/android-chrome-192x192.png"
              alt=""
              className="w-10 h-10 "
            />
            <Link
              to="/"
              className="text-3xl font-extrabold text-primary ml-2 uppercase"
            >
              Tisini
            </Link>
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
              <></>
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
                {generalLinks.map((link, index) => (
                  <Menu.Item>
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
                        <div>{auth.user!.nickname}</div>
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
                    {authLinks.unauthenticated.map((link, index) => (
                      <Menu.Item>
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
