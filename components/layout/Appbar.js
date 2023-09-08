import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Appbar() {
  const router = useRouter();

  return (
    <nav className="h-16 flex items-center py-4 px-32 bg-white">
      <div className="cursor-pointer">
        <Image
          layout="filled"
          width={151}
          height={41}
          alt="logo"
          src="/logo.png"
          onClick={() => {
            router.push(`/`);
          }}
        />
      </div>
    </nav>
  );
}
