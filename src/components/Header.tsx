import React, { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import AuthContext from "../context/Authentication/Auth.provider";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { isAuthenticated, user, logout } = useContext<any>(AuthContext);
  return (
    <div className="h-9 px-14 py-8 w-full flex justify-end bg-primary shadow-sm rounded-b-sm fixed">
      <div className="flex justify-between items-center h-full w-full">
        <div className="flex items-center justify-between">
          <p className="text-accent text-3xl font-extrabold mr-6">
            Cash-e-Waste
          </p>
          <Link to="/" className="mainTitle">
            <button
              className={
                "text-white text-md font-semibold hover cursor-pointer mr-4"
              }
            >
              Home
            </button>
          </Link>
          {isAuthenticated && user.permissions[0] === "*" && (
            <Link to="/admin" className="mainTitle">
              <button
                className={"text-white text-md font-semibold cursor-pointer"}
              >
                Add Items
              </button>
            </Link>
          )}
        </div>

        <div className={" flex items-center justify-center text-primary"}>
          {isAuthenticated && (
            <>
              <p className="text-lg text-white">
                {user?.name ? user.name : user.email}
              </p>
              <img
                className="inline object-cover w-[3rem] h-[3rem] mx-4 rounded-full border border-black"
                src={
                  user.avatar
                    ? user.avatar
                    : `${process.env.REACT_APP_API_PROFILE_URL}${user._id}.svg`
                }
                alt="Profile avatar"
              />
            </>
          )}
          {isAuthenticated ? (
            // logout button
            <div
              onClick={() => logout()}
              title="logout"
              className="flex items-center justify-center text-primary-100 text-base p-2 rounded-8  cursor-pointer"
            >
              <FaSignOutAlt size={20} color="white" />
            </div>
          ) : (
            // login button
            <Link to="/login">
              <button className={"btn-home"}>Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
