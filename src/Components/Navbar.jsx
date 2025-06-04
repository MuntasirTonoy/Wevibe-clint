import React from "react";
import logo from "../assets/logo.png";
import { BiLogIn } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-5 lg:px-10 ">
      <div className="flex-1 ">
        <div className="flex justify-start items-center">
          <img src={logo} alt="site-logo" className="w-8" />
          <a className="font-bold text-2xl">WeVibe</a>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <button className="btn">Upcoming Evenets</button>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
          >
            <li>
              <a className="justify-between">Profile Name</a>
            </li>
            <hr className="mb-1 border-1 border-gray-300" />
            <li>
              <a>Manage Events</a>
            </li>
            <li>
              <a>Joined Events</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <button className="btn bg-teal-700 text-white ">
          {" "}
          Login <FiLogIn />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
