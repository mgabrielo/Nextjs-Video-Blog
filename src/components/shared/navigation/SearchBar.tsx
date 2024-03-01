"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import queryString from "query-string";
const SearchBar = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      searchQuery: text,
    };
    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-row items-center border-[0.5px] border-neutral-700 rounded-full overflow-hidden w-2/5"
    >
      <input
        className="w-full px-4 py-2 bg-neutral-800"
        type="text"
        placeholder="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="px-3">
        <MdOutlineSearch className="h-6 w-6" />
      </button>
    </form>
  );
};

export default SearchBar;
