"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScroll = () => setIsScrolled(window.scrollY > 10);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleSearchSubmit = () => {
    if (search.trim() !== "") {
      router.push(`/search/${search}`);
      setShowSearch(false);
    }
  };

  return (
    <div
      className={`top-0 z-20 sticky flex items-center justify-between py-3 px-4 md:px-10 ${
        isScrolled ? "bg-black" : "bg-transparent"
      } transition-all duration-300`}
    >
      {/* Left side (logo + links) */}
      <div className="flex items-center gap-6">
        {/* Mobile menu toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <CloseIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/assets/netflix_logo.svg"
            alt="Netflix"
            className="w-20 md:w-28"
          />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-6 ml-6">
          <Link href="/" className="text-white hover:text-red-500">
            Home
          </Link>
          <Link href="/series" className="text-white hover:text-red-500">
            Series
          </Link>
          <Link href="/movies" className="text-white hover:text-red-500">
            Movies
          </Link>
          <Link href="/new-and-popular" className="text-white hover:text-red-500">
            New & Popular
          </Link>
          <Link href="/my-list" className="text-white hover:text-red-500">
            My List
          </Link>
        </div>
      </div>

      {/* Right side */}
      <div className="flex gap-4 items-center">
        {/* Desktop search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl border border-gray-600">
          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent outline-none text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
          />
          <SearchIcon
            className="cursor-pointer text-white hover:text-red-500"
            onClick={handleSearchSubmit}
          />
        </div>

        {/* Mobile search icon */}
        <button
          className="sm:hidden text-white"
          onClick={() => setShowSearch(!showSearch)}
        >
          <SearchIcon fontSize="large" />
        </button>

        {/* Profile */}
        <img
          src="/assets/profile_icon.jpg"
          alt="Profile"
          className="w-8 h-8 rounded cursor-pointer"
          onClick={() => setDropDownMenu(!dropDownMenu)}
        />

        {dropDownMenu && (
          <div className="absolute top-16 right-4 z-30 w-32 bg-white rounded-xl shadow-md p-3 flex flex-col gap-3">
            <Link href="/">Home</Link>
            <Link href="/series">Series</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/new-and-popular">New & Popular</Link>
            <Link href="/my-list">My List</Link>
            <a onClick={handleLogout} className="cursor-pointer">
              Log Out
            </a>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-30 flex flex-col p-6 space-y-6 md:hidden">
         <div> <img src="/assets/netflix_logo.svg" width={70} height={70} alt="" /></div> 
          <Link
            href="/"
            onClick={() => setMobileMenu(false)}
            className="text-white text-xl  hover:text-red-500"
          >
            Home
          </Link>
          <Link
            href="/series"
            onClick={() => setMobileMenu(false)}
            className="text-white text-xl  hover:text-red-500"
          >
            Series
          </Link>
          <Link
            href="/movies"
            onClick={() => setMobileMenu(false)}
            className="text-white text-xl  hover:text-red-500"
          >
            Movies
          </Link>
          <Link
            href="/new-and-popular"
            onClick={() => setMobileMenu(false)}
            className="text-white text-xl  hover:text-red-500"
          >
            New & Popular
          </Link>
          <Link
            href="/my-list"
            onClick={() => setMobileMenu(false)}
            className="text-white text-xl hover:text-red-500 "
          >
            My List
          </Link>
        </div>
      )}

      {/* Mobile search bar dropdown with animation */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 right-0 bg-black p-3 flex items-center gap-2 z-30 sm:hidden"
          >
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-white border-b border-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
            <button onClick={handleSearchSubmit}>
              <SearchIcon className="text-white hover:text-red-500" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
