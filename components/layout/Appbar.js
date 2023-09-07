import React from "react";
import Image from "next/image";

export default function Appbar() {
  return (
    <nav className="h-16 flex items-center py-4 px-32 bg-white">
      {/* <div className="relative h-[41px] w-[151px]"> */}
      <Image
        layout="filled"
        width={151}
        height={41}
        alt="logo"
        src="/logo.png"
      />
      {/* </div> */}
    </nav>
  );
}
