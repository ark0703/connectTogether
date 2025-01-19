import React from "react";
import logo from "../assets/logo.svg";
import darklogo from "../assets/dark-logo.svg";
import ThemeToggle from "../ThemeMode/Themetoggle";
import { useGlobalState } from "../ThemeMode/GlobalStateContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isDark, toggleTheme } = useGlobalState();

  return (
    <>
      <div className="navbar bg-base-100 shadow-md ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <a>Forum</a>
                <ul className="p-2 z-30">
                  <li>
                    <Link to="/auth">Auth Page</Link>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img
              src={isDark ? logo : darklogo}
              alt="Connect Together"
              className="w-40 h-auto m-3 hover:scale-110 transition-all text-xl"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <details>
                <summary>Forum</summary>
                <ul className="p-3">
                  <li>
                    <Link to="/auth">Auth Page</Link>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <a className="btn btn-outline">POST</a>
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
                src="https://images.unsplash.com/photo-1612916628677-475f676a6adf"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
