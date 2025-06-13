import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FiLogIn } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="navbar sticky  top-0 z-50 bg-base-100 px-5 lg:px-10 ">
      <div className="flex-1 ">
        <div className="flex justify-start items-center">
          <img src={logo} alt="site-logo" className="w-8" />
          <Link to="/" className="font-bold text-2xl">
            WeVibe
          </Link>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div>
          <NavLink
            to="/upcoming-events"
            className=" hidden md:block  bg-teal-300/20 px-4 py-2 rounded-3xl hover:cursor-pointer"
          >
            Upcoming Evenets
          </NavLink>
        </div>
        <div>
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              value="synthwave"
              className="theme-controller"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL || "https://shorturl.at/py10Y"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
            >
              <li>
                <a className="justify-between">{user.displayName}</a>
              </li>
              <hr className="mb-1 border-1 border-gray-300" />
              <li>
                <NavLink to="/manage-events">
                  {" "}
                  <TfiMenuAlt />
                  Manage Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/Joined-events">
                  <IoMdHeartEmpty />
                  Joined Events
                </NavLink>
              </li>
              <li className="lg:hidden">
                <a>
                  {" "}
                  <HiOutlineCalendarDateRange /> Upcoming Events
                </a>
              </li>
              <li>
                <a onClick={handleLogOut}>
                  <MdOutlineLogout /> Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="">
            <Link to="/login" className="btn bg-teal-600 text-white ">
              {" "}
              Login <FiLogIn />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
