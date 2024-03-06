import clsx from "clsx";

import { Link } from "./Link";

export function Title(props: { suffix?: string }) {
  return (
    <h1 className="p-0 text-lg md:text-xl flex px-2 items-center justify-start">
      <Link href="/">
        nazo6 <span className={clsx({})}>note</span>
        {props.suffix && `: ${props.suffix}`}
      </Link>
    </h1>
  );
}
