"use client";
import NavigationHeader from "./NavigationHeader";
import SearchBar from "./SearchBar";
import UserOptions from "./userOptions/UserOptions";

const NavBar = () => {
  return (
    <div className="fixed w-full bg-stone-900 z-20 h-16 px-2 flex flex-row justify-between items-center">
      <NavigationHeader />
      <SearchBar />
      <UserOptions />
    </div>
  );
};

export default NavBar;
