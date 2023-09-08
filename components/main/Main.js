import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const options = [
  { id: 1, value: "All Submissions", type: "submissions" },
  { id: 2, value: "Favourite Submissions", type: "favourites" },
];

export default function Main() {
  const router = useRouter();

  const [active, setActive] = useState("submissions");
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchDate, setSearchDate] = useState("newest");
  useEffect(() => {
    fetch("http://localhost:3004/submissions")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setFilteredList(data);
        console.log(filteredList);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    const date = event.target.value;
    setSearchQuery(query);

    const searchList = data?.filter((item) => {
      if (searchDate === "newest") {
        return (
          data?.sort((x, y) => new Date(y.date) - new Date(x.date)) &&
          item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      } else if (searchDate === "oldest") {
        return (
          data?.sort((x, y) => new Date(x.date) - new Date(y.date)) &&
          item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      }
    });

    setFilteredList(searchList);
  };

  const handleChangeDate = (event) => {
    setSearchDate(event.target.value);
  };
  const handleClick = (e) => {
    const result = e.target.value;
    setActive(result);
  };

  return (
    <div className="bg-[#F8F9FD] px-32 py-4">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-6 flex-wrap">
          {options.map((item) => (
            <button
              key={item.id}
              className={`font-medium text-lg ${
                item.type === active
                  ? "text-[#333333] border-b-4 border-[#44924C]"
                  : "text-[#666666] border-none"
              }`}
              value={item.type}
              onClick={(e) => handleClick(e, "value")}
            >
              {item.value}
            </button>
          ))}
        </div>
        <form className="flex items-center gap-6 flex-wrap">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-[30px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[300px] h-[40px]"
              placeholder="search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <select
            className="block  pl-10 text-sm text-gray-900 border border-gray-300 rounded-[30px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[140px] h-[40px]"
            value={searchDate}
            onChange={handleChangeDate}
          >
            <option value={"newest"}>Newest</option>
            <option value={"oldest"}>Oldest</option>
          </select>
        </form>
      </div>
      <div className="flex items-center gap-8 flex-wrap my-6 justify-start">
        {active === "submissions" ? (
          <>
            {filteredList?.map((item) => (
              <div
                className="sm:w-[360px] w-[300px] h-[290px] rounded-[16px] p-6 flex flex-col gap-6 shadow-md bg-[#ffffff] relative overflow-auto cursor-pointer"
                key={item.id}
                onClick={() => {
                  router.push(`/submissions/${item.id}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative rounded-[8px] overflow-hidden h-[100px] w-[100px]">
                    <Image
                      src={item.pic}
                      layout="fill"
                      alt={item.title}
                      objectFit="cover"
                    />
                  </div>
                  <h3 className="text-xl text-[#222222] font-medium">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base text-[#333333]">{item.body}</p>
                <p className="self-end text-sm text-[#666666] absolute bottom-4">
                  Uploaded{" "}
                  {Math.floor(
                    (new Date() - new Date(item.date)) / 1000 / 60 / 60 / 24
                  )}{" "}
                  days ago
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            {filteredList
              ?.filter((curr) => curr.type === true)
              .map((item) => (
                <div
                  className="sm:w-[360px] w-[300px] h-[290px] rounded-[16px] p-6 flex flex-col gap-6 shadow-md bg-[#ffffff] relative overflow-auto"
                  key={item.id}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative rounded-[8px] overflow-hidden h-[100px] w-[100px]">
                      <Image
                        src={item.pic}
                        layout="fill"
                        alt={item.title}
                        objectFit="cover"
                      />
                    </div>
                    <h3 className="text-xl text-[#222222] font-medium">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base text-[#333333]">{item.body}</p>
                  <p className="self-end text-sm text-[#666666] absolute bottom-4">
                    {Math.floor(
                      (new Date() - new Date(item.date)) / 1000 / 60 / 60 / 24
                    ) < 0 ? (
                      <>UPComing</>
                    ) : (
                      <>
                        {" "}
                        Uploaded{" "}
                        {Math.floor(
                          (new Date() - new Date(item.date)) /
                            1000 /
                            60 /
                            60 /
                            24
                        )}{" "}
                        days ago
                      </>
                    )}
                  </p>
                </div>
              ))}
          </>
        )}
      </div>{" "}
    </div>
  );
}
