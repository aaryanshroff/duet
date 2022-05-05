import React from "react";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";

export const NavBar = () => {
  return (
    <div className="flex justify-between shadow-sm px-8 py-4 items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Duet<span className="text-4xl text-violet-500">.</span>
      </Link>
      {/* Nav Buttons */}
      <AuthButton />
    </div>
  );
};
