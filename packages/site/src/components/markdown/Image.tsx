"use client";

import clsx from "clsx";
import { useState } from "react";

export function Image(props: { src?: string }) {
  const [open, setOpen] = useState(false);

  const src = props.src?.startsWith("http") ? props.src : `/${props.src}`;

  return (
    <div className="text-center">
      <img
        {...props}
        src={src}
        alt={props.src}
        className={clsx("cursor-zoom-in inline")}
        onClick={() => {
          setOpen(true);
        }}
      />
      {open && (
        <div
          className={clsx(
            "fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black bg-opacity-80 z-[100] p-3 lg:p-10",
          )}
          onClick={() => {
            setOpen(false);
          }}
        >
          <img
            className={clsx("m-auto max-w-full max-h-full", "cursor-zoom-out")}
            src={src}
            alt={props.src}
          />
        </div>
      )}
    </div>
  );
}
