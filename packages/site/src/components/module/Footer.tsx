import { GithubIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-auto w-full drop-shadow-[0_-5px_5px_rgba(0,0,0,0.1)]">
      <div className="flex w-full bg-content py-4 justify-center">
        ©nazo6
        <div className="flex ml-5">
          <a
            href="https://github.com/nazo6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="nazo6 github"
          >
            <GithubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
