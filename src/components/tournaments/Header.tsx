import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { CgMenuRight, CgClose } from "react-icons/cg";

import { navigation, tournaData } from "@/lib/constants/tournaments";
import NavMobile from "./NavMobile";

const Header = () => {
  const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const { tournament } = useParams<{ tournament: string }>();
  const tourna = tournament?.replace(/-/g, " ");
  const logo = tourna && tournaData[tourna] ? tournaData[tourna].logo : "";

  useEffect(() => {
    const handleScroll = () => {
      setBg(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        bg ? "bg-primary" : "bg-none"
      } fixed left-0 w-full z-20 transition-all duration-200`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="h-24 w-24" src={logo} alt="rausha kipaji logo" />
          </Link>

          <div
            onClick={() => setMobileNav(!mobileNav)}
            className="text-2xl text-white md:hidden lg:text-xl cursor-pointer"
          >
            {/* {mobileNav ? <CgClose /> : <CgMenuRight />} */}
          </div>

          <nav className="hidden md:flex">
            <ul className="md:flex items-center gap-x-12">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    className="capitalize text-white hover:border-b hover:border-[#ff581f] hover:text-[#ff581f] transition-all"
                    to={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <button className="hover:bg-green-600 bg-orange  text-xl rounded-md backdrop-blur-md transition p-2">
                <Link to="/fixtures">Get Fixtures</Link>
              </button>

              {/* <a
                href="https://portal.tisini.co.ke/auth/register/team-owner"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-green-600 bg-orange  text-xl rounded-md backdrop-blur-md transition p-2"
              >
                Register Here
              </a> */}
            </ul>
          </nav>

          <div
            className={`${
              mobileNav ? "left-0" : "-left-full"
            } md:hidden fixed bottom-0 w-full max-w-xs h-screen transition-all`}
          >
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
