/**
 * @author Felix Orinda
 * @email forinda82@gmail.com
 * @create date 2023-07-06 23:47:00
 * @modify date 2023-07-06 23:47:00
 * @desc [Application header]
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

const headerBottomList = [
  {
    title: "The rise of Moises Caicedo",
    img: "/league-6-color-small.png",
  },
  {
    title: "Inside the closure of Barca TV",
    img: "/league-17-color-small.png",
  },
  {
    title: "Wimbledon: The original grand slam",
    img: "/league-56-color-small.png",
  },
];

export default function MainHeader() {
  const { auth,dispatch } = useAuth();
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
                <button className="bg-white text-primary rounded-md px-4 py-1">
                  Sign Up
                </button>
                <button>
                  <FontAwesomeIcon icon={faSearch} className="text-white" />
                </button>
              </div>
            )}
          </div>
          <hr className="bg-white" />
          {/* Layer 2 */}
          <div className="flex gap-2 bg-primary-lighter">
            {headerBottomList.map((item) => (
              <div className="flex gap-2" key={item.title}>
                <img src={item.img} alt="logo" width={20} height={20} />
                <span className="text-neutral-200 text-sm">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
