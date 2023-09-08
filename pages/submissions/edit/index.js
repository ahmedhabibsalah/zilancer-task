import { useRouter } from "next/router";
import React from "react";

export default function Edit() {
  const router = useRouter();
  const slug = router.query.slug;

  return <div>{slug}</div>;
}
