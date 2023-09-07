import Image from "next/image";
import React from "react";
import data from "../../data/dummyData.json";

export default function Favourite() {
  return (
    <div className="flex items-center gap-8 flex-wrap my-6 justify-center">
      {data.favourites.map((item) => (
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
            <h3 className="text-xl text-[#222222] font-medium">{item.title}</h3>
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
    </div>
  );
}
