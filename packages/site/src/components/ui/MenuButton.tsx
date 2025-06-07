import clsx from "clsx";

export function MenuButton({
  open,
  onClick,
  className,
}: {
  open: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col justify-center", className)}>
      <div className="relative mx-auto sm:max-w-xl">
        <button
          className="relative h-10 w-10 dark:text-white focus:outline-hidden"
          onClick={onClick}
        >
          <span className="sr-only">Open main menu</span>
          <div
            className={
              "absolute left-1/2 top-1/2 block w-5   -translate-x-1/2  -translate-y-1/2 transform"
            }
          >
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-5 transform bg-current transition duration-500 ease-in-out ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute block  h-0.5 w-5 transform   bg-current transition duration-500 ease-in-out ${
                open && "opacity-0"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute block  h-0.5 w-5 transform bg-current  transition duration-500 ease-in-out ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
