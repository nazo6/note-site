"use client";

import { lazy, useEffect, useState } from "react";

import { SearchIcon } from "lucide-react";
const SearchModal = lazy(() => import("./SearchModal"));

export function SearchButton(props: { className?: string }) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  return (
    <button
      className={props.className}
      aria-label="Open search modal"
      onClick={() => setShow(true)}
    >
      <SearchIcon />
      {show && <SearchModal setShow={setShow} />}
    </button>
  );
}
